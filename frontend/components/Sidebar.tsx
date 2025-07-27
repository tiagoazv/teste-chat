import { FaUserCircle } from 'react-icons/fa'

interface SidebarProps {
  users: { _id: string; name: string; online: boolean }[];
  selectedUser: any;
  onSelectUser: (user: any) => void;
}

export default function Sidebar({ users, selectedUser, onSelectUser }: SidebarProps) {
  return (
    <div className="w-[250px] bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Usuários</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition hover:bg-gray-100 ${
              selectedUser?._id === user._id ? 'bg-gray-100' : ''
            }`}
          >
            <span className="mr-2"><FaUserCircle size={24} /></span>
            <span className="flex-1">{user.name}</span>
            <span className={`text-sm ${user.online ? 'text-green-500' : 'text-gray-400'}`}>
              {user.online ? '●' : '○'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
