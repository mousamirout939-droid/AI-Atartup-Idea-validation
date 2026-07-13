import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { User, Lock, Gauge } from 'lucide-react';
import Sidebar from '../components/common/sidebar';
import Button from '../components/common/button';
import { useAuthStore } from '../store/authstore';
import api from '../utils/api';

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [usage, setUsage] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    api.get('/users/usage').then(({ data }) => setUsage(data.data)).catch(() => {});
  }, []);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const { data } = await api.put('/users/profile', { name });
      updateUser(data.data.user);
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setSavingPassword(true);
    try {
      await api.put('/users/change-password', passwords);
      toast.success('Password changed');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="font-display text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-sm text-gray-500">Manage your account details and usage.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleProfileSave} className="card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-gray-900">
                <User className="h-4 w-4" /> Profile Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input value={user?.email} disabled className="input bg-gray-50 text-gray-400" />
                </div>
              </div>
              <Button type="submit" loading={savingProfile} className="mt-5">Save Changes</Button>
            </form>

            <form onSubmit={handlePasswordChange} className="card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-gray-900">
                <Lock className="h-4 w-4" /> Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Current Password</label>
                  <input type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="label">New Password</label>
                  <input type="password" required minLength={6} value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="input" />
                </div>
              </div>
              <Button type="submit" loading={savingPassword} className="mt-5">Update Password</Button>
            </form>
          </div>

          <div className="card h-fit p-6">
            <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-gray-900">
              <Gauge className="h-4 w-4" /> Usage This Month
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="mb-1 flex justify-between text-gray-600">
                  <span>Ideas</span>
                  <span>{usage?.ideasUsedThisMonth ?? 0} / {usage?.limits?.ideasPerMonth === Infinity ? '∞' : usage?.limits?.ideasPerMonth ?? '-'}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.min(100, ((usage?.ideasUsedThisMonth || 0) / (usage?.limits?.ideasPerMonth || 1)) * 100)}%` }} />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-gray-600">
                  <span>Exports</span>
                  <span>{usage?.exportsUsedThisMonth ?? 0} / {usage?.limits?.exportsPerMonth === Infinity ? '∞' : usage?.limits?.exportsPerMonth ?? '-'}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${Math.min(100, ((usage?.exportsUsedThisMonth || 0) / (usage?.limits?.exportsPerMonth || 1)) * 100)}%` }} />
                </div>
              </div>
              <p className="pt-2 text-xs text-gray-400 capitalize">Current plan: <strong className="text-gray-700">{user?.plan}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
