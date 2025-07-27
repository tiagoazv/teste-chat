'use client';
import { useEffect, useState } from 'react';
import api from '@services/api';
import useSocket from '@hooks/useSocket';
import Sidebar from '@components/Sidebar';
import ChatArea from '@components/ChatArea';

export default function ChatPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [socketReady, setSocketReady] = useState(false);

  const socket = useSocket(userId);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    setUserId(id);

    if (!token) return;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.get('/users').then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    api.get(`/messages/${selectedUser._id}`).then(res => setMessages(res.data));
  }, [selectedUser]);

  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handler = (msg: any) => {
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

    const msg = { from: userId, to: selectedUser._id, content };
    socket.emit('sendMessage', msg);
    setContent('');
  };

  return (
    <div className="h-screen w-screen bg-[url('/background.jpg')] bg-cover flex justify-center items-center">
      <div className="w-[70%] h-[80%] shadow-xl rounded-lg overflow-hidden flex bg-white">
        <Sidebar users={users} selectedUser={selectedUser} onSelectUser={setSelectedUser} />
        <ChatArea
          selectedUser={selectedUser}
          messages={messages}
          currentUserId={userId || ''}
          content={content}
          onContentChange={setContent}
          onSend={handleSend}
          socketReady={socketReady}
        />
      </div>
    </div>
  );
}
