import fetch from 'node-fetch';
import mongoose from 'mongoose';

// Import the GuildConfig model from bot folder
const GuildConfigSchema = new mongoose.Schema({
  guildId: { type: String, required: true },  
  prefix: { type: String, default: '&' },
  logChannels: {
    type: Map,
    of: String,
    default: new Map()
  }
}, {
  timestamps: true
});

const GuildConfig = mongoose.model('GuildConfig', GuildConfigSchema);

export const updateBotConfig = async (req, res) => {
  try {
    const { serverId } = req.params;
    const { channelConfigurations } = req.body;

    console.log('Updating bot config for server:', serverId);
    console.log('Channel configurations:', channelConfigurations);

    if (!serverId) {
      return res.status(400).json({
        success: false,
        message: 'Server ID is required'
      });
    }

    // Save configuration directly to MongoDB
    try {
      // Find or create guild configuration
      let guildConfig = await GuildConfig.findOne({ guildId: serverId });
      
      if (!guildConfig) {
        guildConfig = new GuildConfig({
          guildId: serverId,
          logChannels: new Map()
        });
      }

      // Update log channels
      if (channelConfigurations) {
        // Clear existing channels
        guildConfig.logChannels.clear();
        
        // Add new channels
        Object.entries(channelConfigurations).forEach(([category, channel]) => {
          if (channel && channel.id) {
            guildConfig.logChannels.set(category, channel.id);
          }
        });
      }

      // Save configuration
      await guildConfig.save();

      console.log('✅ Guild configuration updated successfully');
      
      return res.json({
        success: true,
        message: 'Configuration updated successfully',
        data: {
          guildId: serverId,
          logChannels: Object.fromEntries(guildConfig.logChannels)
        }
      });

    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to save configuration to database'
      });
    }

  } catch (error) {
    console.error('Error in updateBotConfig:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getBotConfig = async (req, res) => {
  try {
    const { serverId } = req.params;

    console.log('Getting bot config for server:', serverId);
    if (!serverId) {
      return res.status(400).json({
        success: false,
        message: 'Server ID is required'
      });
    }

    // Get configuration from MongoDB
    try {
      const guildConfig = await GuildConfig.findOne({ guildId: serverId });
      
      if (!guildConfig) {
        return res.json({
          success: true,
          data: {
            guildId: serverId,
            logChannels: {}
          }
        });
      }

      return res.json({
        success: true,
        data: {
          guildId: serverId,
          logChannels: Object.fromEntries(guildConfig.logChannels)
        }
      });

    } catch (dbError) {
      console.error('Error getting configuration from database:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Failed to get configuration from database'
      });
    }

  } catch (error) {
    console.error('Error in getBotConfig:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
