import express from 'express';
import { create, getUsers, getMessage, deleteMessage } from '../controllers/message.js'
import { authenticateJWT } from '../middleware/index.js';
const router = express.Router();
router.post('/create',authenticateJWT, create);
router.post('/get-message',authenticateJWT, getMessage);
router.post('/delete',authenticateJWT, deleteMessage);
router.post('/get-user',authenticateJWT, getUsers);
export default router;
