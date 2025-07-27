'use client';
import { FC } from 'react';

interface ChatHeaderProps {
  name: string;
  online: boolean;
}

const ChatHeader: FC<ChatHeaderProps> = ({ name, online }) => {
  return (
    <div className="px-4 py-3 border-b bg-white flex justify-between items-center">
      <div>
        <div className="font-semibold text-gray-800">{name}</div>
        <div className="text-sm text-gray-500">
          {online ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
