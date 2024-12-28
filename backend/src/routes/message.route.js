import express from 'express';
import { getUser, getMessages, sendMessages,getTyping } from '../controllers/messages.controllers.js';
import { isAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// todo add middleware 
router.post('/get_typing',isAuth,getTyping)

router.get('/showuser', isAuth, getUser);

router.get('/:id', isAuth, getMessages);

router.post('/send/:id', isAuth, sendMessages);


export default router;