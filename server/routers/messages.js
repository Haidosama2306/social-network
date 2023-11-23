import express from 'express';
import { create, getUsers, getMessage } from '../controllers/message.js'
import { authenticateJWT } from '../middleware/index.js';
const router = express.Router();
router.post('/create',authenticateJWT, create);
router.post('/get-message',authenticateJWT, getMessage);
router.post('/get-user',authenticateJWT, getUsers);
export default router;
