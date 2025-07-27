interface MessageListProps {
  messages: any[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-2">
      {messages.map((msg, i) => {
        const isOwn = msg.from === currentUserId;
        return (
          <div
            key={i}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm leading-snug shadow 
                ${isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
