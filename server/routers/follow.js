import express from 'express';

import {getUsers, search} from '../controllers/users.js'
import { authenticateJWT } from '../middleware/index.js';


const router = express.Router();

router.get('/', getUsers);

router.post('/search',authenticateJWT, search);

export default router;