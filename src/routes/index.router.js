import express from 'express';
import configRouters from './config.router.js';

const router = express.Router();

router.use('/config', configRouters);

export default router;
