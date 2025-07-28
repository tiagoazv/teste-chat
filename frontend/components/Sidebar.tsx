'use client';
import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import api from '@services/api';

interface User {
  _id: string;
  name: string;
}

interface SidebarProps {
  users: User[];
  selectedUserId: string | null;
  onSelect: (user: User) => void;
  socket: Socket | null;
  onlineUserIds: string[];
  unreadUserIds: string[];
  lastMessages: { [userId: string]: string };
}

const Sidebar: FC<SidebarProps> = ({
  users,
  selectedUserId,
  onSelect,
  socket,
  onlineUserIds,
  unreadUserIds,
  lastMessages,
}) => {
  const [localLastMessages, setLocalLastMessages] = useState(lastMessages);

  useEffect(() => {
    setLocalLastMessages(lastMessages);
  }, [lastMessages]);

  return (
    <div className="w-72 bg-white overflow-y-auto border-r">
      {users.map((user) => (
        <div
          key={user._id}
          className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 ${
            selectedUserId === user._id ? 'bg-gray-200' : ''
          }`}
          onClick={() => onSelect(user)}
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 font-medium text-gray-800 relative">
              {user.name}
              {unreadUserIds.includes(user._id) && (
                <span className="relative w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  <span className="absolute inset-0 rounded-full bg-red-500"></span>
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 truncate max-w-[200px]">
              {localLastMessages[user._id] || 'Clique para iniciar uma conversa'}
            </div>
          </div>
          <div className="ml-2">
            <span
              className={`w-3 h-3 rounded-full block ${
                onlineUserIds.includes(user._id) ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
