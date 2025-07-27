'use client';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket(userId: string | null): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:5000');
    socket.emit('register', userId);
    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return socketRef.current;
}
 