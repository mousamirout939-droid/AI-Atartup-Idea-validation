import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, Bell, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuthStore } from '../../store/authstore';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-gray-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow">
            <Rocket className="h-5 w-5" />
          </span>
          IdeaValidator<span className="text-brand-600">.AI</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl border border-gray-200 py-1.5 pl-1.5 pr-3 hover:bg-gray-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
                  {user.name?.[0]?.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-gray-700">{user.name?.split(' ')[0]}</span>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white p-1.5 shadow-soft"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Bell className="h-4 w-4" /> Admin Panel
                    </Link>
                  )}
                  {user.role === 'company' && (
                    <Link to="/company" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <LayoutDashboard className="h-4 w-4" /> Company Portal
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 text-gray-600 md:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 px-4 py-3 md:hidden">
          {publicLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2 border-t border-gray-100 pt-3">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-primary flex-1">Dashboard</Link>
                <button onClick={handleLogout} className="btn-secondary flex-1">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1">Log in</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
