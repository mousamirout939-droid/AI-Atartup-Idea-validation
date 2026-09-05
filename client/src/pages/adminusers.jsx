import { useEffect, useState } from 'react';
import Sidebar from '../components/common/sidebar';
import SearchBar from '../components/common/searchbar';
import UserTable from '../components/admin/usertable';
import Loader from '../components/common/loader';
import { useAdminStore } from '../store/adminstore';

export default function AdminUsers() {
  const { users, loading, getUsers, toggleUserStatus, updateUserRole } = useAdminStore();
  const [search, setSearch] = useState('');

  useEffect(() => { getUsers({ search }); }, [search, getUsers]);

  return (
    <div className="flex">
      <Sidebar variant="admin" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold text-gray-900">Users</h1>
          <div className="w-full sm:w-72"><SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." /></div>
        </div>
        <div className="card p-6">
          {loading ? <Loader /> : <UserTable users={users} onToggleStatus={toggleUserStatus} onRoleChange={updateUserRole} />}
        </div>
      </div>
    </div>
  );
}
