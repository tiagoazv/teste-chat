// backend/src/socketHandler.js
import Message from '../models/Message.js';
import User from '../models/User.js';

const onlineUsers = new Map();

export function setupSocket(io) {
  const emitOnlineUsers = () => {
    const onlineIds = [...onlineUsers.keys()];
    io.emit('updateOnlineUsers', onlineIds);
  };

  io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    socket.on('register', async (userId) => {
      if (!userId) return;

      onlineUsers.set(userId, socket.id);
      await User.findByIdAndUpdate(userId, { online: true });

      emitOnlineUsers();
      socket.emit('updateOnlineUsers', [...onlineUsers.keys()]);
    });


    socket.on('sendMessage', async ({ from, to, content }) => {
      const message = await Message.create({ from, to, content });

      const recipientSocketId = onlineUsers.get(to);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receiveMessage', message);
      }

      const senderSocketId = onlineUsers.get(from);
      if (senderSocketId && senderSocketId !== recipientSocketId) {
        io.to(senderSocketId).emit('receiveMessage', message);
      }
    });

    socket.on('disconnect', async () => {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        console.log(`Desconectando usuário ${disconnectedUserId}`);
        await User.findByIdAndUpdate(disconnectedUserId, { online: false });
        emitOnlineUsers();
      }
    });
  });
}
