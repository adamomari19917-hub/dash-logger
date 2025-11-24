import axios from 'axios';

class DiscordAPI {
  constructor() {
    this.baseURL = 'https://discord.com/api/v10';
    this.botToken = process.env.DISCORD_BOT_TOKEN;
  }

  createBotClient() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bot ${this.botToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  createUserClient(accessToken) {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }


  async getGuild(guildId) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/guilds/${guildId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guild:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get guild channels
  async getGuildChannels(guildId) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/guilds/${guildId}/channels`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guild channels:', error.response?.data || error.message);
      throw error;
    }
  }

  // Get guild members
  async getGuildMembers(guildId, limit = 1000) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/guilds/${guildId}/members?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guild members:', error.response?.data || error.message);
      throw error;
    }
  }

  async getGuildRoles(guildId) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/guilds/${guildId}/roles`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guild roles:', error.response?.data || error.message);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      throw error;
    }
  }

  async getGuildMember(guildId, userId) {
    try {
      const client = this.createBotClient();
      const response = await client.get(`/guilds/${guildId}/members/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching guild member:', error.response?.data || error.message);
      throw error;
    }
  }

  async sendMessage(channelId, content, embeds = null) {
    try {
      const client = this.createBotClient();
      const payload = { content };
      
      if (embeds) {
        payload.embeds = embeds;
      }

      const response = await client.post(`/channels/${channelId}/messages`, payload);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
      throw error;
    }
  }

  async createWebhook(channelId, name, avatar = null) {
    try {
      const client = this.createBotClient();
      const payload = { name };
      
      if (avatar) {
        payload.avatar = avatar;
      }

      const response = await client.post(`/channels/${channelId}/webhooks`, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating webhook:', error.response?.data || error.message);
      throw error;
    }
  }

  async executeWebhook(webhookId, webhookToken, content, embeds = null) {
    try {
      const response = await axios.post(
        `${this.baseURL}/webhooks/${webhookId}/${webhookToken}`,
        {
          content,
          embeds
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error executing webhook:', error.response?.data || error.message);
      throw error;
    }
  }


  async checkUserPermissions(guildId, userId, permissions) {
    try {
      const member = await this.getGuildMember(guildId, userId);
      const guild = await this.getGuild(guildId);
      const roles = await this.getGuildRoles(guildId);
      if (guild.owner_id === userId) {
        return true;
      }

      const memberRoles = roles.filter(role => member.roles.includes(role.id));
      let memberPermissions = 0n;
      memberRoles.forEach(role => {
        memberPermissions |= BigInt(role.permissions);
      });

      if ((memberPermissions & 0x8n) === 0x8n) {
        return true;
      }

      return (memberPermissions & BigInt(permissions)) === BigInt(permissions);

    } catch (error) {
      console.error('Error checking user permissions:', error.response?.data || error.message);
      return false;
    }
  }
}

export const discordAPI = new DiscordAPI();
export default discordAPI;
