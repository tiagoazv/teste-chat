import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import {
  sendMessage,
  getMessagesWithUser,
  getLastMessageWithUser,
} from '../controllers/messageController.js';

const router = Router();

router.get('/last/:id', authenticateJWT, getLastMessageWithUser); // <== Mova esta antes
router.get('/:id', authenticateJWT, getMessagesWithUser);

export default router;
