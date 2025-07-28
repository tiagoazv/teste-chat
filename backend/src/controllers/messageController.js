import Message from '../models/Message.js';

export const getMessagesWithUser = async (req, res) => {
  const from = req.user._id;
  const to = req.params.id;

  try {
    const messages = await Message.find({
      $or: [
        { from, to },
        { from: to, to: from }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar mensagens.' });
  }
};

export const getLastMessageWithUser = async (req, res) => {
  const userId = req.user._id;
  const otherId = req.params.id;

  try {
    const lastMessage = await Message.findOne({
      $or: [
        { from: userId, to: otherId },
        { from: otherId, to: userId }
      ]
    }).sort({ timestamp: -1 }); 

    res.json(lastMessage || null);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar última mensagem.' });
  }
};

export const sendMessage = async (req, res) => {
  const from = req.user._id;
  const { to, content } = req.body;

  try {
    const message = await Message.create({ from, to, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar mensagem.' });
  }
};
