import express from 'express';

import {followed, findFollowed, searchfollowed, insertFollowed, deleteFollowed} 
    from '../controllers/followers.js';
import { authenticateJWT } from '../middleware/index.js';



const router = express.Router();

router.get('/', followed);

//Followed
router.post('/findfollowed',authenticateJWT, findFollowed);
router.post('/searchfollowed',authenticateJWT, searchfollowed);
router.post('/insertfollowed',authenticateJWT, insertFollowed);
router.post('/deletefollowed',authenticateJWT, deleteFollowed);

//Following
// router.post('/getfollowing',authenticateJWT, following);
// router.post('/searchfollowing',authenticateJWT, searchfollowing);
// router.post('/insertfollowing',authenticateJWT, insertFollowing);
// router.post('/deletefollowing',authenticateJWT, deleteFollowing);

export default router;