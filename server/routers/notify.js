import express from 'express';
import { authenticateJWT } from '../middleware/index.js';
import { createNotify, getNotify } from '../controllers/notify.js';
const router = express.Router();
router.post('/create',authenticateJWT, createNotify);
router.post('/get-notify',authenticateJWT, getNotify);
export default router;
