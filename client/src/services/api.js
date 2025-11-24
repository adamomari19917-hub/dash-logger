import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('discordUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Discord OAuth callback
  handleCallback: async (code) => {
    const response = await api.post('/auth/discord/callback', { code });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Get user guilds
  getUserGuilds: async () => {
    const response = await api.get('/auth/guilds');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Logs API calls
export const logsAPI = {
  // Get logs with filters
  getLogs: async (filters = {}) => {
    const response = await api.get('/logs', { params: filters });
    return response.data;
  },

  // Get log by ID
  getLogById: async (id) => {
    const response = await api.get(`/logs/${id}`);
    return response.data;
  },

  // Export logs
  exportLogs: async (filters = {}) => {
    const response = await api.get('/logs/export', { 
      params: filters,
      responseType: 'blob'
    });
    return response.data;
  },

  // Get log statistics
  getLogStats: async (serverId) => {
    const response = await api.get(`/logs/stats/${serverId}`);
    return response.data;
  },
};

// Settings API calls
export const settingsAPI = {
  // Get server settings
  getSettings: async (serverId) => {
    const response = await api.get(`/settings/${serverId}`);
    return response.data;
  },

  // Update server settings
  updateSettings: async (serverId, settings) => {
    const response = await api.put(`/settings/${serverId}`, settings);
    return response.data;
  },

  // Reset settings to default
  resetSettings: async (serverId) => {
    const response = await api.post(`/settings/${serverId}/reset`);
    return response.data;
  },
};

// Server API calls
export const serverAPI = {
  // Get server info
  getServerInfo: async (serverId) => {
    const response = await api.get(`/servers/${serverId}`);
    return response.data;
  },

  // Get server channels
  getServerChannels: async (serverId) => {
    const response = await api.get(`/servers/${serverId}/channels`);
    return response.data;
  },

  // Get server members
  getServerMembers: async (serverId) => {
    const response = await api.get(`/servers/${serverId}/members`);
    return response.data;
  },

  // Get server roles
  getServerRoles: async (serverId) => {
    const response = await api.get(`/servers/${serverId}/roles`);
    return response.data;
  },
};

// Bot status API calls
export const statusAPI = {
  // Get bot status
  getBotStatus: async () => {
    const response = await api.get('/status/bot');
    return response.data;
  },

  getUptimeData: async (range = '30days') => {
    const response = await api.get('/status/uptime', { params: { range } });
    return response.data;
  },
};

export default api;
