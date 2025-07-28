'use client';
import { FC, useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Autoajuste da altura
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 9 * 24)}px`; // ~24px por linha
    }
  }, [text]);

  return (
    <div className="p-4 bg-white border-t flex gap-2 items-end">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Digite sua mensagem..."
        className="flex-1 px-4 py-2 border rounded-xl resize-none overflow-hidden text-sm max-h-[216px] focus:outline-none"
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
