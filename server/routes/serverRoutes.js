import express from 'express';
import serverController from '../controllers/serverController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/test', serverController.testEndpoint);
router.get('/test-channels/:serverId', serverController.testChannels);
router.use(verifyToken);
router.get('/:serverId', serverController.getServerInfo);
router.get('/:serverId/channels', serverController.getServerChannels);
router.get('/:serverId/members', serverController.getServerMembers);
router.get('/:serverId/roles', serverController.getServerRoles);
router.get('/:serverId/stats', serverController.getServerStats);
router.put('/:serverId/config', serverController.updateServerConfig);

export default router;
