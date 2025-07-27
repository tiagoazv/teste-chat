interface MessageInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function MessageInput({ value, onChange, onSend, disabled }: MessageInputProps) {
  return (
    <div className="flex gap-3 items-center pt-3 border-t mt-4">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Digite sua mensagem..."
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className="px-5 py-2 bg-blue-600 text-white font-medium rounded-full transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enviar
      </button>
    </div>
  );
}
