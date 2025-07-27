'use client';
import { useEffect, useState } from 'react';
import api from '@services/api';
import useSocket from '@hooks/useSocket';

interface User {
  _id: string;
  name: string;
  online: boolean;
}

interface Message {
  from: string;
  to: string;
  content: string;
}

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState('');
  const [socketReady, setSocketReady] = useState(false);

  const socket = useSocket(userId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    setUserId(id);

    if (!token) return;

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    api.get(`/messages/${selectedUser._id}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error('Erro ao buscar mensagens:', err));
  }, [selectedUser]);

useEffect(() => {
  if (!socket || !selectedUser) {
    return;
  }
  const handler = (msg: Message) => {
    if (
      (msg.from === selectedUser._id && msg.to === userId) ||
      (msg.from === userId && msg.to === selectedUser._id)
    ) {
      setMessages(prev => [...prev, msg]);
    }
  };

  socket.on('receiveMessage', handler);
  setSocketReady(true);

  return () => {
    socket.off('receiveMessage', handler);
  };
}, [socket, selectedUser, userId]);

  const handleSend = () => {
    if (!content.trim() || !socket || !selectedUser) return;

    const msg: Message = {
      from: userId!,
      to: selectedUser._id,
      content
    };

    socket.emit('sendMessage', msg);
    setContent('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Lista de usuários */}
      <aside className="w-64 border-r border-gray-300 p-4 bg-white overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Usuários</h2>
        {users.map(user => (
          <div
            key={user._id}
            className={`p-2 rounded cursor-pointer mb-2 flex justify-between items-center
              ${selectedUser?._id === user._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            onClick={() => setSelectedUser(user)}
          >
            <span>{user.name}</span>
            <span className="text-sm">{user.online ? '🟢' : '⚪'}</span>
          </div>
        ))}
      </aside>

      {/* Chat principal */}
      <main className="flex flex-col flex-1 p-4">
        <h2 className="text-xl font-semibold mb-2">
          Chat com {selectedUser?.name || '...'}
        </h2>

        <div className="flex-1 overflow-y-auto bg-white rounded border border-gray-300 p-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${msg.from === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm
                  ${msg.from === userId ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Campo de envio */}
        <div className="flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSend}
            disabled={!socketReady}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
}
