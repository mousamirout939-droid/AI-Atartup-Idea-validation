import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authstore';
import Loader from './loader';

export default function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <Loader fullScreen label="Checking your session..." />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
