import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface ChatAreaProps {
  selectedUser: any;
  messages: any[];
  currentUserId: string;
  content: string;
  onContentChange: (v: string) => void;
  onSend: () => void;
  socketReady: boolean;
}

export default function ChatArea({
  selectedUser,
  messages,
  currentUserId,
  content,
  onContentChange,
  onSend,
  socketReady
}: ChatAreaProps) {
  return (
    <div className="flex flex-col flex-1 bg-white rounded-2xl p-4 shadow-xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4 border-b pb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="text-lg font-semibold text-gray-800">
          Chat com {selectedUser?.name || '...'}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <MessageList messages={messages} currentUserId={currentUserId} />
      </div>
      <MessageInput
        value={content}
        onChange={onContentChange}
        onSend={onSend}
        disabled={!socketReady}
      />
    </div>
  );
}
