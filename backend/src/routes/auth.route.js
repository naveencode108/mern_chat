import express from 'express';
import { Signup, Login, Logout ,updateProfile, Check, getUser} from '../controllers/auth.controllers.js'
import { isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

router.get('/check',Check);
router.get('/get_user',isAuth,getUser);
// todo
router.post('/update_profile',isAuth,updateProfile);



export default router;