import express from 'express';
import { login, logout, register, checkLogin, sendEmailForgetPwd, resetPwd, updatePassword } from '../controllers/auth.js'
import { authenticateJWT } from '../middleware/index.js';
const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/forgotPass', sendEmailForgetPwd);
router.post('/updatePwd', updatePassword);
router.post('/resetPass', resetPwd);
router.post('/logout',authenticateJWT, logout);
router.post('/checkLogin',authenticateJWT, checkLogin);
export default router;
