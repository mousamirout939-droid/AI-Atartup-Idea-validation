import LoginForm from '../components/auth/loginform';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-grid-pattern px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-glow">
            <Rocket className="h-6 w-6" />
          </span>
          <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Log in to continue validating your ideas.</p>
        </div>
        <div className="card p-6">
          <LoginForm />
          <div className="mt-5 flex justify-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
            <Link to="/company/login" className="hover:text-brand-600">Company login</Link>
            <Link to="/admin/login" className="hover:text-brand-600">Admin login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
