'use client';
import { FC, useState } from 'react';

interface MessageInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: (text: string) => void;
  disabled?: boolean;
}

const MessageInput: FC<MessageInputProps> = ({ value, onChange, onSend, disabled }) => {
  const [text, setText] = useState(value);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="p-4 bg-white border-t flex gap-2">
      <input
        className="flex-1 px-4 py-2 border rounded-xl"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
      >
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
