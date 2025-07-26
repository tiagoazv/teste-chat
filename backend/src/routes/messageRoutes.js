import express from 'express';
import passport from 'passport';
import { sendMessage, getMessagesWithUser } from '../controllers/messageController.js';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.post('/', sendMessage); // enviar mensagem
router.get('/:userId', getMessagesWithUser); // mensagens com usuário específico

export default router;
