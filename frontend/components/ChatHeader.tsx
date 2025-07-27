export default function ChatHeader({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 mb-4 border-b pb-3">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="text-lg font-semibold text-gray-800">
        Chat com {name}
      </div>
    </div>
  );
}
