import { ShieldCheck, ShieldOff } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export default function UserTable({ users = [], onToggleStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
            <th className="py-3 pr-4 font-medium">Name</th>
            <th className="py-3 pr-4 font-medium">Email</th>
            <th className="py-3 pr-4 font-medium">Plan</th>
            <th className="py-3 pr-4 font-medium">Role</th>
            <th className="py-3 pr-4 font-medium">Joined</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {users.map((u) => (
            <tr key={u._id}>
              <td className="py-3 pr-4 font-medium text-gray-900">{u.name}</td>
              <td className="py-3 pr-4 text-gray-500">{u.email}</td>
              <td className="py-3 pr-4"><span className="badge bg-brand-50 text-brand-700 capitalize">{u.plan}</span></td>
              <td className="py-3 pr-4 capitalize text-gray-500">{u.role}</td>
              <td className="py-3 pr-4 text-gray-500">{formatDate(u.createdAt)}</td>
              <td className="py-3 pr-4">
                <span className={`badge ${u.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {u.isActive ? 'Active' : 'Disabled'}
                </span>
              </td>
              <td className="py-3">
                <button onClick={() => onToggleStatus(u._id)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600">
                  {u.isActive ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                  {u.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
