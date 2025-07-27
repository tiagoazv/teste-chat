import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/me', authenticateJWT, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    username: req.user.username,
    online: req.user.online
  });
});

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('name username online');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

export default router;
