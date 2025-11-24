import express from 'express';
import authController from '../controllers/authController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/discord/callback', authController.handleDiscordCallback);
router.get('/discord/url', authController.getDiscordAuthUrl);
router.get('/me', verifyToken, authController.getCurrentUser);
router.get('/guilds', verifyToken, authController.getUserGuilds);
router.get('/user-guilds', verifyToken, authController.getUserGuilds);
router.get('/bot-servers', authController.getBotServers);
router.post('/logout', verifyToken, authController.logout);
router.post('/refresh', authController.refreshToken);
router.post('/refresh-user', authController.refreshUserData);

export default router;
