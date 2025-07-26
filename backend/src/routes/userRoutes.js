import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    online: req.user.online
  });
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select('name username online');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

export default router;
