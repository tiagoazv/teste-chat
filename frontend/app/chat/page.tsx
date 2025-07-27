'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import ChatHeader from '@components/ChatHeader';
import MessageList from '@components/MessageList';
import MessageInput from '@components/MessageInput';
import api from '@services/api';

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [unreadUserIds, setUnreadUserIds] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId || socket) return;

    const s = io('http://localhost:5000');
    s.emit('register', userId);
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (!token) return;
    if (id) setUserId(id);
    if (name) setUserName(name);
    if (email) setUserEmail(email);
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
    if (!socket || !userId) return;

    const handler = (msg: any) => {
      if (
        (msg.from === selectedUser?._id && msg.to === userId) ||
        (msg.from === userId && msg.to === selectedUser?._id)
      ) {
        setMessages(prev => [...prev, msg]);
      } else if (msg.to === userId) {
        setUnreadUserIds(prev => prev.includes(msg.from) ? prev : [...prev, msg.from]);
      }
    };

    const statusHandler = (ids: string[]) => setOnlineUserIds(ids);

    socket.on('receiveMessage', handler);
    socket.on('updateOnlineUsers', statusHandler);

    return () => {
      socket.off('receiveMessage', handler);
      socket.off('updateOnlineUsers', statusHandler);
    };
  }, [socket, selectedUser, userId]);

  const handleSend = (content: string) => {
    if (!content.trim() || !socket || !selectedUser || !userId) return;

    const msg = { from: userId, to: selectedUser._id, content };
    socket.emit('sendMessage', msg);
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setUnreadUserIds(prev => prev.filter(id => id !== user._id));
  };

  return (
    <div className="h-screen w-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="w-[70%] h-[90%] mx-auto mt-10 flex flex-col rounded-2xl shadow-lg overflow-hidden">
        <Header userName={userName} userEmail={userEmail} />
        <div className="flex flex-1">
          <Sidebar
            users={users}
            selectedUserId={selectedUser?._id || null}
            onSelect={handleSelectUser}
            socket={socket}
            onlineUserIds={onlineUserIds}
            unreadUserIds={unreadUserIds}
          />
          <div className="flex flex-col flex-1">
            {selectedUser && <ChatHeader name={selectedUser.name} online={onlineUserIds.includes(selectedUser._id)} />}
            <MessageList messages={messages} currentUserId={userId || ''} />
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}

