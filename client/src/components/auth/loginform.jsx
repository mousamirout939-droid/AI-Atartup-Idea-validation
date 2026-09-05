import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authstore';
import Button from '../common/button';

export default function LoginForm({ expectedRole = 'user' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      if (user.role !== expectedRole) {
        useAuthStore.getState().logout();
        throw new Error(`This login is for ${expectedRole} accounts only.`);
      }
      toast.success('Welcome back!');
      const defaultPath = expectedRole === 'admin' ? '/admin' : expectedRole === 'company' ? '/company' : '/dashboard';
      navigate(location.state?.from?.pathname || defaultPath, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input pl-10"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="label mb-0">Password</label>
          <Link to="/forgot-password" className="text-xs font-medium text-brand-600 hover:underline">Forgot password?</Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input pl-10"
            placeholder="••••••••"
          />
        </div>
      </div>

      <Button type="submit" loading={loading} className="w-full">Log in</Button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account? <Link to="/register" className="font-semibold text-brand-600 hover:underline">Sign up</Link>
      </p>
    </form>
  );
}
