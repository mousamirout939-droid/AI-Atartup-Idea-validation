import LoginForm from '../components/auth/loginform';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminLogin() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-grid-pattern px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-glow">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h1 className="font-display text-2xl font-bold text-gray-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Manage users, submissions, and platform activity.</p>
        </div>
        <div className="card p-6"><LoginForm expectedRole="admin" /><p className="mt-5 border-t border-gray-100 pt-4 text-center text-xs text-gray-500">Return to <Link to="/login" className="font-semibold text-brand-600">customer login</Link></p></div>
      </div>
    </div>
  );
}