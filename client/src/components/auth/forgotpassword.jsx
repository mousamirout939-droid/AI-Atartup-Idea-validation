import { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authstore';
import Button from '../common/button';

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuthStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
        If an account exists for <strong>{email}</strong>, we've sent a password reset link.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Email</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-10" placeholder="you@example.com" />
        </div>
      </div>
      <Button type="submit" loading={loading} className="w-full">Send reset link</Button>
    </form>
  );
}
