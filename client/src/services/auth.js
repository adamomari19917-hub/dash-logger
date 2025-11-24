import { authAPI } from './api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = null;
    this.guilds = [];
  }

  // Initialize Discord OAuth flow
  initiateDiscordLogin() {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID || '1421528633289216093';
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const scope = 'identify email guilds';
    const state = this.generateState();
    
    // Store state for verification
    localStorage.setItem('oauth_state', state);
    
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&prompt=consent`;
    
    return discordAuthUrl;
  }

  // Generate random state for OAuth security
  generateState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Handle OAuth callback
  async handleCallback(code, state) {
    try {
      // Verify state
      const storedState = localStorage.getItem('oauth_state');
      if (state !== storedState) {
        throw new Error('Invalid state parameter');
      }
      
      // Clear stored state
      localStorage.removeItem('oauth_state');
      
      // Exchange code for tokens
      const response = await authAPI.handleCallback(code);
      
      if (response.success) {
        this.token = response.token;
        this.user = response.user;
        this.guilds = response.guilds || [];
        
        // Store in localStorage
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('discordUser', JSON.stringify(this.user));
        localStorage.setItem('userGuilds', JSON.stringify(this.guilds));
        
        return { success: true, user: this.user, guilds: this.guilds };
      } else {
        throw new Error(response.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      if (!this.token) {
        return null;
      }
      
      const response = await authAPI.getCurrentUser();
      this.user = response.user;
      
      return this.user;
    } catch (error) {
      console.error('Get current user error:', error);
      this.logout();
      return null;
    }
  }

  // Get user guilds
  async getUserGuilds() {
    try {
      if (!this.token) {
        return [];
      }
      
      const response = await authAPI.getUserGuilds();
      this.guilds = response.guilds || [];
      
      // Update localStorage
      localStorage.setItem('userGuilds', JSON.stringify(this.guilds));
      
      return this.guilds;
    } catch (error) {
      console.error('Get user guilds error:', error);
      return [];
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get stored user data
  getStoredUser() {
    try {
      const userData = localStorage.getItem('discordUser');
      const guildsData = localStorage.getItem('userGuilds');
      
      if (userData) {
        this.user = JSON.parse(userData);
        this.guilds = guildsData ? JSON.parse(guildsData) : [];
        return { user: this.user, guilds: this.guilds };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      this.logout();
      return null;
    }
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local data regardless of API call success
      this.token = null;
      this.user = null;
      this.guilds = [];
      
      localStorage.removeItem('authToken');
      localStorage.removeItem('discordUser');
      localStorage.removeItem('userGuilds');
      localStorage.removeItem('oauth_state');
    }
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Get user info
  getUser() {
    return this.user;
  }

  // Get user guilds
  getGuilds() {
    return this.guilds;
  }

  // Check if user has admin permissions for a guild
  hasAdminPermissions(guildId) {
    const guild = this.guilds.find(g => g.id === guildId);
    if (!guild) return false;
    
    // Check if user is owner or has administrator permission
    return guild.owner || (guild.permissions & 0x8) === 0x8;
  }

  // Get guilds where user has admin permissions
  getAdminGuilds() {
    return this.guilds.filter(guild => 
      guild.owner || (guild.permissions & 0x8) === 0x8
    );
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
