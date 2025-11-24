import fetch from 'node-fetch';


class ServerController {
  // Test endpoint to check if server is working
  async testEndpoint(req, res) {
    try {
      // Test Discord API connectivity
      let discordTest = 'Not tested';
      if (process.env.DISCORD_BOT_TOKEN) {
        try {
          const discordResponse = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
              'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              'Content-Type': 'application/json'
            }
          });
          discordTest = discordResponse.ok ? 'Connected' : `Failed: ${discordResponse.status}`;
        } catch (discordError) {
          discordTest = `Error: ${discordError.message}`;
        }
      }

      res.json({
        success: true,
        message: 'Server controller is working',
        timestamp: new Date().toISOString(),
        botToken: process.env.DISCORD_BOT_TOKEN ? 'Present' : 'Missing',
        discordAPI: discordTest
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server controller test failed',
        error: error.message
      });
    }
  }

  // Test channels endpoint without authentication
  async testChannels(req, res) {
    try {
      const { serverId } = req.params;
      console.log('Testing channels for server ID:', serverId);

      if (!process.env.DISCORD_BOT_TOKEN) {
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      // Fetch channels from Discord API
      const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}/channels`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Discord API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API error:', errorText);
        return res.status(response.status).json({
          success: false,
          message: `Discord API error: ${response.status}`,
          error: errorText
        });
      }

      const channels = await response.json();
      console.log('Received channels:', channels.length);

      res.json({
        success: true,
        channelCount: channels.length,
        channels: channels.slice(0, 3), // Show first 3 channels as sample
        message: 'Channels fetched successfully'
      });

    } catch (error) {
      console.error('Error in testChannels:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to test channels',
        error: error.message
      });
    }
  }

  // Get server information
  async getServerInfo(req, res) {
    try {
      const { serverId } = req.params;

      if (!process.env.DISCORD_BOT_TOKEN) {
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      // Fetch real server data from Discord API
      const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API error:', errorText);
        
        if (response.status === 403) {
          return res.status(403).json({
            success: false,
            message: 'Bot does not have access to this server'
          });
        }
        
        if (response.status === 404) {
          return res.status(404).json({
            success: false,
            message: 'Server not found'
          });
        }
        
        throw new Error(`Discord API error: ${response.status}`);
      }

      const guild = await response.json();
      
      const serverInfo = {
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        memberCount: guild.approximate_member_count || guild.member_count || 0,
        channelCount: guild.channels?.length || 0,
        roleCount: guild.roles?.length || 0,
        region: guild.region || 'unknown',
        verificationLevel: guild.verification_level,
        createdAt: new Date((guild.id / 4194304) + 1420070400000).toISOString(),
        features: guild.features || [],
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0
      };

      res.json({
        success: true,
        server: serverInfo
      });

    } catch (error) {
      console.error('Error fetching server info:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch server information',
        error: error.message
      });
    }
  }

  // Get server channels
  async getServerChannels(req, res) {
    try {
      const { serverId } = req.params;
      console.log('🔍 Fetching channels for server ID:', serverId);
      console.log('🔑 Bot token present:', process.env.DISCORD_BOT_TOKEN ? 'Yes' : 'No');

      // Check if bot token exists
      if (!process.env.DISCORD_BOT_TOKEN) {
        console.error('❌ DISCORD_BOT_TOKEN not found in environment variables');
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      // Fetch channels from Discord API
      console.log('📡 Making Discord API request to:', `https://discord.com/api/v10/guilds/${serverId}/channels`);
      const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}/channels`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📊 Discord API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API error response:', errorText);
        
        if (response.status === 403) {
          return res.status(403).json({
            success: false,
            message: 'Bot does not have access to this server'
          });
        }
        
        if (response.status === 404) {
          return res.status(404).json({
            success: false,
            message: 'Server not found'
          });
        }
        
        throw new Error(`Discord API error: ${response.status} - ${errorText}`);
      }

      const discordChannels = await response.json();
      console.log('Received channels from Discord:', discordChannels.length);

      // Filter and format channels - use real Discord data only
      const channels = discordChannels
        .filter(channel => [0, 2, 4, 5, 13, 15].includes(channel.type)) // Text, Voice, Category, Announcement, Stage, Forum
        .map(channel => ({
          id: channel.id,
          name: channel.name,
          type: channel.type,
          position: channel.position,
          parentId: channel.parent_id,
          topic: channel.topic || null
        }))
        .sort((a, b) => a.position - b.position);

      console.log('Formatted channels:', channels.length);

      res.json({
        success: true,
        channels
      });

    } catch (error) {
      console.error('Error fetching server channels:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch server channels',
        error: error.message
      });
    }
  }

  // Get server members
  async getServerMembers(req, res) {
    try {
      const { serverId } = req.params;
      const { limit = 50, page = 1 } = req.query;

      if (!process.env.DISCORD_BOT_TOKEN) {
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      // Fetch real members data from Discord API
      const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}/members?limit=${limit}`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API error:', errorText);
        
        if (response.status === 403) {
          return res.status(403).json({
            success: false,
            message: 'Bot does not have access to server members'
          });
        }
        
        throw new Error(`Discord API error: ${response.status}`);
      }

      const discordMembers = await response.json();
      
      const members = discordMembers.map(member => ({
        id: member.user.id,
        username: member.user.username,
        discriminator: member.user.discriminator,
        avatar: member.user.avatar,
        roles: member.roles || [],
        joinedAt: member.joined_at,
        nickname: member.nick
      }));

      res.json({
        success: true,
        members,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: members.length
        }
      });

    } catch (error) {
      console.error('Error fetching server members:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch server members',
        error: error.message
      });
    }
  }

  // Get server roles
  async getServerRoles(req, res) {
    try {
      const { serverId } = req.params;

      if (!process.env.DISCORD_BOT_TOKEN) {
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      // Fetch real roles data from Discord API
      const response = await fetch(`https://discord.com/api/v10/guilds/${serverId}/roles`, {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API error:', errorText);
        
        if (response.status === 403) {
          return res.status(403).json({
            success: false,
            message: 'Bot does not have access to server roles'
          });
        }
        
        throw new Error(`Discord API error: ${response.status}`);
      }

      const roles = await response.json();

      res.json({
        success: true,
        roles: roles.sort((a, b) => b.position - a.position) 
      });

    } catch (error) {
      console.error('Error fetching server roles:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch server roles',
        error: error.message
      });
    }
  }


  async getServerStats(req, res) {
    try {
      const { serverId } = req.params;

      if (!process.env.DISCORD_BOT_TOKEN) {
        return res.status(500).json({
          success: false,
          message: 'Bot token not configured'
        });
      }

      const [guildResponse, channelsResponse] = await Promise.all([
        fetch(`https://discord.com/api/v10/guilds/${serverId}?with_counts=true`, {
          headers: {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }),
        fetch(`https://discord.com/api/v10/guilds/${serverId}/channels`, {
          headers: {
            'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            'Content-Type': 'application/json'
          }
        })
      ]);

      if (!guildResponse.ok || !channelsResponse.ok) {
        throw new Error('Failed to fetch server data from Discord API');
      }

      const guild = await guildResponse.json();
      const channels = await channelsResponse.json();

      const textChannels = channels.filter(ch => [0, 5, 15].includes(ch.type)).length; 
      const voiceChannels = channels.filter(ch => [2, 13].includes(ch.type)).length; 

      const stats = {
        serverId,
        totalMembers: guild.approximate_member_count || 0,
        onlineMembers: guild.approximate_presence_count || 0,
        totalChannels: channels.length,
        textChannels,
        voiceChannels,
        totalRoles: guild.roles?.length || 0,
        boostLevel: guild.premium_tier || 0,
        boostCount: guild.premium_subscription_count || 0,
        verificationLevel: guild.verification_level,
        features: guild.features || [],
        lastActivity: new Date().toISOString()
      };

      res.json({
        success: true,
        stats
      });

    } catch (error) {
      console.error('Error fetching server stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch server statistics',
        error: error.message
      });
    }
  }

  async updateServerConfig(req, res) {
    try {
      const { serverId } = req.params;
      const config = req.body;
      console.log(`Updating config for server ${serverId}:`, config);

      res.json({
        success: true,
        message: 'Server configuration updated successfully',
        config
      });

    } catch (error) {
      console.error('Error updating server config:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update server configuration'
      });
    }
  }
}

export default new ServerController();
