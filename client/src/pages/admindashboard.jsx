import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';
import AnalyticsCards from '../components/admin/analyticscards';
import RevenueStats from '../components/admin/revenuestates';
import { useAdminStore } from '../store/adminstore';

export default function AdminDashboard() {
  const { analytics, loading, getAnalytics, payments, getPayments } = useAdminStore();

  useEffect(() => {
    getAnalytics();
    getPayments();
  }, [getAnalytics, getPayments]);

  return (
    <div className="flex">
      <Sidebar variant="admin" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="font-display text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-sm text-gray-500">Platform-wide analytics and health.</p>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-6"><AnalyticsCards analytics={analytics} /></div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="card p-6">
                <h3 className="mb-4 font-display font-semibold text-gray-900">Revenue by Plan</h3>
                <RevenueStats payments={payments} />
              </div>

              <div className="card p-6">
                <h3 className="mb-4 font-display font-semibold text-gray-900">Ideas by Industry</h3>
                <div className="space-y-2">
                  {(analytics?.ideasByIndustry || []).map((row) => (
                    <div key={row._id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{row._id || 'Unspecified'}</span>
                      <span className="font-semibold text-gray-900">{row.count}</span>
                    </div>
                  ))}
                  {!analytics?.ideasByIndustry?.length && <p className="text-sm text-gray-400">No data yet.</p>}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
              <Link to="/admin/ideas" className="btn-secondary">Manage Ideas</Link>
              <Link to="/admin/analytics" className="btn-secondary">Deep Analytics</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
