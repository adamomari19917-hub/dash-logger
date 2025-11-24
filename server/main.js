import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import serverRoutes from './routes/serverRoutes.js';
import configRoutes from './routes/configRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });
console.log('🔍 Environment Check:');
console.log('PORT:', process.env.PORT);
console.log('DISCORD_BOT_TOKEN:', process.env.DISCORD_BOT_TOKEN ? 'Present' : 'Missing');
console.log('CLIENT_URL:', process.env.CLIENT_URL);

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.use('/api/auth', authRoutes);
app.use('/api/servers', serverRoutes);
app.use('/api/config', configRoutes);

// Health check endpoint (No DB required)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    env: process.env.NODE_ENV,
    mongoConfigured: !!process.env.MONGO_URI
  });
});

// Guilds cache endpoint
app.use('/api/guilds', express.Router()
  .post('/cache', (req, res) => {
    try {
      const { guildIds } = req.body;

      if (!guildIds || !Array.isArray(guildIds)) {
        return res.status(400).json({ error: 'Invalid guildIds format' });
      }

      // Store guilds cache (you can expand this to save to database if needed)
      console.log('✅ Guilds cache updated:', guildIds.length, 'guilds');
      res.status(200).json({ message: 'Guilds cache updated successfully', count: guildIds.length });
    } catch (error) {
      console.error('❌ Failed to update guilds cache:', error);
      res.status(500).json({ error: 'Failed to update guilds cache' });
    }
  })
);

app.use('/api/status/bot', express.Router()
  .post('/update-info', (req, res) => {
    try {
      const { name, tag, avatar, bio } = req.body;

      if (name) botData.name = name;
      if (tag) botData.tag = tag;
      if (avatar) botData.avatar = avatar;
      if (bio) botData.bio = bio;

      console.log('✅ Bot info updated:', { name, tag, avatar: avatar ? 'updated' : 'unchanged', bio: bio ? 'updated' : 'unchanged' });
      res.status(200).json({ message: 'Bot info updated successfully' });
    } catch (error) {
      console.error('❌ Failed to update bot info:', error);
      res.status(500).json({ error: 'Failed to update bot info' });
    }
  })
  .post('/update-status', (req, res) => {
    try {
      const { status, ping, servers, users, commands, version, uptime } = req.body;

      if (status) botData.status = status;
      if (ping !== undefined) botData.ping = ping;
      if (servers !== undefined) botData.servers = servers;
      if (users !== undefined) botData.users = users;
      if (commands !== undefined) botData.commands = commands;
      if (version) botData.version = version;
      if (uptime !== undefined) {
        const uptimeMs = Date.now() - uptime;
        const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          botData.uptime = `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
        } else if (hours > 0) {
          botData.uptime = `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
          botData.uptime = `${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
      }

      console.log('✅ Bot status updated:', { status, ping, servers, users, commands, version, uptime: uptime ? 'updated' : 'unchanged' });
      res.status(200).json({ message: 'Bot status updated successfully' });
    } catch (error) {
      console.error('❌ Failed to update bot status:', error);
      res.status(500).json({ error: 'Failed to update bot status' });
    }
  })
);


app.get('/api/developer', async (req, res) => {
  try {
    const developerId = process.env.DEVELOPER_USER_ID;
    if (!developerId) {
      return res.status(404).json({ error: 'Developer ID not configured' });
    }

    const response = await fetch(`https://discord.com/api/v10/users/${developerId}`, {
      headers: {
        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    const userData = await response.json();

    res.json({
      id: userData.id,
      username: userData.username,
      discriminator: userData.discriminator,
      avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png?size=512` : null,
      globalName: userData.global_name || userData.username
    });
  } catch (error) {
    console.error('❌ Failed to fetch developer info:', error);
    res.status(500).json({ error: 'Failed to fetch developer info' });
  }
});

let botData = {
  name: null,
  tag: null,
  avatar: null,
  bio: null,
  status: 'offline',
  uptime: null,
  ping: null,
  servers: null,
  users: null,
  commands: null,
  version: null
};

app.get('/api/bot/status', (req, res) => {
  try {
    res.json(botData);
  } catch (error) {
    console.error('Error fetching bot status:', error);
    res.status(500).json({ error: 'Failed to fetch bot status' });
  }
});

app.post('/api/bot/update-info', (req, res) => {
  try {
    const { name, tag, avatar, bio } = req.body;

    if (name) botData.name = name;
    if (tag) botData.tag = tag;
    if (avatar) botData.avatar = avatar;
    if (bio) botData.bio = bio;

    console.log('✅ Bot info updated:', { name, tag, avatar: avatar ? 'updated' : 'unchanged', bio: bio ? 'updated' : 'unchanged' });
    res.status(200).json({ message: 'Bot info updated successfully' });
  } catch (error) {
    console.error('❌ Failed to update bot info:', error);
    res.status(500).json({ error: 'Failed to update bot info' });
  }
});

app.post('/api/bot/update-status', (req, res) => {
  try {
    const { status, ping, servers, users, commands, version, uptime } = req.body;

    if (status) botData.status = status;
    if (ping !== undefined) botData.ping = ping;
    if (servers !== undefined) botData.servers = servers;
    if (users !== undefined) botData.users = users;
    if (commands !== undefined) botData.commands = commands;
    if (version) botData.version = version;
    if (uptime !== undefined) {
      const uptimeMs = Date.now() - uptime;
      const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((uptimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        botData.uptime = `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
      } else if (hours > 0) {
        botData.uptime = `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}`;
      } else {
        botData.uptime = `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }
    }

    console.log('✅ Bot status updated:', { status, ping, servers, users, commands, version, uptime: uptime ? 'updated' : 'unchanged' });
    res.status(200).json({ message: 'Bot status updated successfully' });
  } catch (error) {
    console.error('❌ Failed to update bot status:', error);
    res.status(500).json({ error: 'Failed to update bot status' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB and start server
// Connect to MongoDB and start server
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');
};

if (process.env.VERCEL) {
  // Vercel Serverless environment
  connectDB().catch(err => console.error('MongoDB connection error:', err));
} else {
  // Local/Standard environment
  const startServer = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Logger Bot API server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
      });
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  };
  startServer();
}

export default app;
