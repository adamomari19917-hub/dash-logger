    import axios from 'axios';
import jwt from 'jsonwebtoken';
import { discordAPI } from '../utils/discordAPI.js';

class AuthController {
  async handleDiscordCallback(req, res) {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ 
          success: false, 
          message: 'Authorization code is required' 
        });
      }

      const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: 'identify email guilds'
      }, {
        headers: {  
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, refresh_token } = tokenResponse.data;
      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const user = userResponse.data;
      const guilds = guildsResponse.data;
      const adminGuilds = guilds.filter(guild => 
        guild.owner || (guild.permissions & 0x8) === 0x8
      );
      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username,
          displayName: user.global_name || user.display_name || user.username,
          discriminator: user.discriminator,
          avatar: user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.global_name || user.display_name || user.username,
          discriminator: user.discriminator,
          avatar: user.avatar,
          email: user.email
        },
        guilds: adminGuilds,
        accessToken: access_token,
        refreshToken: refresh_token
      });

    } catch (error) {
      console.error('Discord OAuth error:', error.response?.data || error.message);
      

      let errorMessage = 'Authentication failed';
      if (error.response?.data?.error === 'invalid_client') {
        errorMessage = 'Invalid Discord client credentials. Please check your .env configuration.';
      } else if (error.response?.data?.error === 'invalid_request') {
        if (error.response?.data?.error_description?.includes('rate limited')) {
          errorMessage = 'Discord rate limit reached. Please wait a few minutes and try again.';
        } else {
          errorMessage = 'Invalid OAuth request. Please check redirect URI configuration.';
        }
      } else if (error.response?.data?.error === 'invalid_grant') {
        errorMessage = 'Authorization code expired or already used. Please try logging in again.';
        return res.status(400).json({ 
          success: false, 
          message: errorMessage,
          error: error.response?.data?.error_description || error.message,
          code: 'INVALID_GRANT'
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: errorMessage,
        error: error.response?.data?.error_description || error.message,
        details: process.env.NODE_ENV === 'development' ? error.response?.data : undefined
      });
    }
  }

  async getDiscordAuthUrl(req, res) {
    try {
      const clientId = process.env.DISCORD_CLIENT_ID;
      const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI);
      const scope = 'identify email guilds';
      const state = Math.random().toString(36).substring(2, 15);
      
      const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
      
      res.json({ 
        success: true, 
        authUrl,
        state 
      });
    } catch (error) {
      console.error('Error generating auth URL:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to generate auth URL' 
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = req.user;
      res.json({ 
        success: true, 
        user 
      });
    } catch (error) {
      console.error('Error getting current user:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to get user information' 
      });
    }
  }

  async getUserGuilds(req, res) {
    try {
      const userId = req.user.userId;
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Access token required'
        });
      }

      const token = authHeader.split(' ')[1];
      
      try {
        res.json({ 
          success: true, 
          guilds: [],
          message: 'Please use the guilds from your login response. Real-time guild fetching requires storing Discord access tokens.',
          needsClientSideGuilds: true
        });
        
      } catch (discordError) {
        console.error('Discord API error:', discordError);
        res.status(500).json({
          success: false,
          message: 'Failed to fetch guilds from Discord'
        });
      }
      
    } catch (error) {
      console.error('Error getting user guilds:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to get user guilds' 
      });
    }
  }

  static botServersCache = {
    data: null,
    lastFetch: 0,
    cacheDuration: 30000 
  };

  async getBotServers(req, res) {
    try {
      const now = Date.now();
      if (AuthController.botServersCache.data && 
          (now - AuthController.botServersCache.lastFetch) < AuthController.botServersCache.cacheDuration) {
        return res.json(AuthController.botServersCache.data);
      }

      const botToken = process.env.DISCORD_BOT_TOKEN;
      
      if (!botToken) {
        console.error('DISCORD_BOT_TOKEN not found in environment variables');
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      const response = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          'Authorization': `Bot ${botToken}`,
          'Content-Type': 'application/json'
        }
      });

      const botGuilds = response.data.map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        memberCount: guild.approximate_member_count || 0,
        owner: guild.owner
      }));

      const responseData = {
        success: true,
        guilds: botGuilds,
        count: botGuilds.length
      };

      AuthController.botServersCache.data = responseData;
      AuthController.botServersCache.lastFetch = now;

      console.log(`✅ Bot is in ${botGuilds.length} servers:`, botGuilds.map(g => `${g.name} (${g.id})`));

      res.json(responseData);
    } catch (error) {
      console.error('Error getting bot servers:', error.response?.data || error.message);
      
      if (AuthController.botServersCache.data) {
        console.log('⚠️ API failed, returning cached data');
        return res.json(AuthController.botServersCache.data);
      }

      res.json({
        success: true,
        guilds: [],
        count: 0,
        error: 'Failed to fetch bot servers from Discord API'
      });
    }
  }

  async logout(req, res) {
    try {
      res.json({ 
        success: true, 
        message: 'Logged out successfully' 
      });
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Logout failed' 
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ 
          success: false, 
          message: 'Refresh token is required' 
        });
      }

      const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', {
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const { access_token, refresh_token: newRefreshToken } = tokenResponse.data;

      res.json({
        success: true,
        accessToken: access_token,
        refreshToken: newRefreshToken
      });

    } catch (error) {
      console.error('Token refresh error:', error.response?.data || error.message);
      res.status(401).json({ 
        success: false, 
        message: 'Token refresh failed' 
      });
    }
  }

  async refreshUserData(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          message: 'Authorization token required'
        });
      }

      const discordAccessToken = req.body.discordAccessToken;
      
      if (!discordAccessToken) {
        return res.status(400).json({ 
          success: false, 
          message: 'Discord access token is required' 
        });
      }

      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${discordAccessToken}`
        }
      });

      const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${discordAccessToken}`
        }
      });

      const user = userResponse.data;
      const guilds = guildsResponse.data;
      const adminGuilds = guilds.filter(guild => 
        guild.owner || (guild.permissions & 0x8) === 0x8
      );

      const token = jwt.sign(
        { 
          userId: user.id, 
          username: user.username,
          displayName: user.global_name || user.display_name || user.username,
          discriminator: user.discriminator,
          avatar: user.avatar
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.global_name || user.display_name || user.username,
          discriminator: user.discriminator,
          avatar: user.avatar,
          email: user.email
        },
        guilds: adminGuilds
      });

    } catch (error) {
      console.error('User data refresh error:', error.response?.data || error.message);
      
      if (error.response?.status === 401) {
        return res.status(401).json({ 
          success: false, 
          message: 'Access token expired or invalid',
          needsReauth: true
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: 'Failed to refresh user data' 
      });
    }
  }
}

export default new AuthController();
