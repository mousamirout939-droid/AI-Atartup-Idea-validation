import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  User,
  Users,
  BarChart3,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '../../store/authstore';

const userLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze', label: 'New Idea', icon: Lightbulb },
  { to: '/my-ideas', label: 'My Ideas', icon: FileText },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/profile', label: 'Profile', icon: User },
];

const adminLinks = [
  { to: '/admin', label: 'Overview', icon: ShieldCheck },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/ideas', label: 'Ideas', icon: Lightbulb },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ variant = 'user' }) {
  const { user } = useAuthStore();
  const links = variant === 'admin' ? adminLinks : userLinks;

  return (
    <aside className="hidden w-60 shrink-0 border-r border-gray-100 bg-white px-3 py-6 lg:block">
      <nav className="space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon className="h-4.5 w-4.5" />
            {label}
          </NavLink>
        ))}
      </nav>

      {variant === 'user' && (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-4 text-white">
          <p className="text-sm font-semibold">{user?.plan === 'free' ? 'Free Plan' : `${user?.plan} Plan`}</p>
          <p className="mt-1 text-xs text-brand-100">
            {user?.plan === 'free' ? 'Upgrade for more ideas & exports.' : 'Thanks for being a subscriber!'}
          </p>
          {user?.plan === 'free' && (
            <NavLink to="/pricing" className="mt-3 inline-block rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-700">
              Upgrade
            </NavLink>
          )}
        </div>
      )}
    </aside>
  );
}
