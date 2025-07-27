// src/routes/messageRoutes.js
import { Router } from 'express';
import passport from 'passport';
import Message from '../models/Message.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:id', authenticateJWT, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { from: req.user._id, to: req.params.id },
      { from: req.params.id, to: req.user._id }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});

export default router;
