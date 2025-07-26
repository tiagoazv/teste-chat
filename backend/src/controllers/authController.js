import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = new User({ name, username, password });
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao cadastrar usuário.', error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.online = true;
    await user.save();
    res.json({ token, user: { id: user._id, name: user.name, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Erro interno no login.' });
  }
};
