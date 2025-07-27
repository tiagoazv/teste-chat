import { ReactNode } from "react";
import { User } from '../types/User';

interface ContactItemProps {
  user: User;
  name: string;
  lastMessage: string;
  active?: boolean;
  children?: ReactNode;
}

export default function ContactItem({ name, lastMessage, active, children }: ContactItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors duration-200
        ${active ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'}`}
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0" />
      <div className="flex flex-col overflow-hidden">
        <p className="font-medium text-gray-800 truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
      {children}
    </div>
  );
}
