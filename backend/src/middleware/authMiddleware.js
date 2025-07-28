import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}
