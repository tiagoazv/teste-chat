import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  const { to, content } = req.body;
  const from = req.user._id;

  try {
    const message = await Message.create({ from, to, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.' });
  }
};

export const getMessagesWithUser = async (req, res) => {
  const { userId } = req.params;
  const from = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { from, to: userId },
        { from: userId, to: from }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar mensagens.' });
  }
};
