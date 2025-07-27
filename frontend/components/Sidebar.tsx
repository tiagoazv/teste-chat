'use client';
import { FC } from 'react';
import { Socket } from 'socket.io-client';

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
}

const Sidebar: FC<SidebarProps> = ({
  users,
  selectedUserId,
  onSelect,
  socket,
  onlineUserIds,
  unreadUserIds,
}) => {
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
          <div>
            <div className="flex items-center gap-2 font-medium text-gray-800 relative">
              {user.name}
              {unreadUserIds.includes(user._id) && (
                <span className="relative w-2.5 h-2.5">
                  <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  <span className="absolute inset-0 rounded-full bg-red-500"></span>
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {onlineUserIds.includes(user._id) ? 'Online' : 'Offline'}
            </div>
          </div>
          <div className="relative">
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
