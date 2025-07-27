// backend/src/socketHandler.js
import Message from '../models/Message.js';
import User from '../models/User.js';

const onlineUsers = new Map();

export function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    socket.on('register', async (userId) => {
      onlineUsers.set(userId, socket.id);
      await User.findByIdAndUpdate(userId, { online: true });
      io.emit('userStatusUpdate');
    });

    socket.on('sendMessage', async ({ from, to, content }) => {
      const message = await Message.create({ from, to, content });

      const recipientSocketId = onlineUsers.get(to);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receiveMessage', message);
      }

      // Também envia para o remetente (útil se ele estiver com múltiplas abas)
      const senderSocketId = onlineUsers.get(from);
      if (senderSocketId && senderSocketId !== recipientSocketId) {
        io.to(senderSocketId).emit('receiveMessage', message);
      }
    });

    socket.on('disconnect', async () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          await User.findByIdAndUpdate(userId, { online: false });
          break;
        }
      }

      io.emit('userStatusUpdate');
    });
  });
}
