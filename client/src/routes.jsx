import { Routes, Route } from 'react-router-dom';

import Landing from './pages/landing';
import About from './pages/about';
import Contact from './pages/contact';
import Pricing from './pages/pricing';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetpassword';
import NotFound from './pages/notfound';

import Dashboard from './pages/dashboard';
import AnalyzeIdea from './pages/analyzeidea';
import MyIdeas from './pages/myideas';
import IdeaDetail from './pages/ideadetail';
import Reports from './pages/reports';
import Profile from './pages/profile';

import AdminDashboard from './pages/admindashboard';
import AdminUsers from './pages/adminusers';
import AdminIdeas from './pages/adminideas';
import AdminAnalytics from './pages/adminanalytics';

import ProtectedRoute from './components/common/protectedroute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Authenticated user routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeIdea />} />
        <Route path="/my-ideas" element={<MyIdeas />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/ideas" element={<AdminIdeas />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
