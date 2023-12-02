import express from 'express';

import { comments, findComments , insertComments} from '../controllers/comments.js';
import { authenticateJWT } from '../middleware/index.js';



const router = express.Router();

router.get('/', comments);

//Followed
router.post('/findcomments',authenticateJWT, findComments);
router.post('/insertcomments',authenticateJWT, insertComments);

export default router;