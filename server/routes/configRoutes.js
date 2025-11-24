import express from 'express';
import { updateBotConfig, getBotConfig } from '../controllers/configController.js';

const router = express.Router();
router.post('/servers/:serverId/config', updateBotConfig);
router.get('/servers/:serverId/config', getBotConfig);

export default router;
