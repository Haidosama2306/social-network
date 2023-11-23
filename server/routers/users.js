import express from 'express';

import {getUsers, updateUser, getUserUpdate, search, getProfile } from '../controllers/users.js'
import { authenticateJWT } from '../middleware/index.js';


const router = express.Router();

router.get('/', getUsers);

// router.post('/', createUser);
router.post('/update/get-user',authenticateJWT, getUserUpdate);
router.post('/update',authenticateJWT, updateUser);
router.post('/search',authenticateJWT, search);
router.post('/profile',authenticateJWT, getProfile);
router.post('/follow',authenticateJWT, );


export default router;