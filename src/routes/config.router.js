import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { ConfigController } from '../controllers/config.controller.js';

const router = express.Router();

const configController = new ConfigController();

router.get('/serverList', authMiddleware, configController.getConfig);
router.post('/serverList', authMiddleware, configController.setConfig);
router.delete('/serverList', authMiddleware, configController.deleteConfig);
router.post('/banList', authMiddleware, configController.setBanConfig);

export default router;
