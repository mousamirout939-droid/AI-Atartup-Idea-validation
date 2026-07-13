import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useStartupStore } from '../store/startupstore';
import { useReportStore } from '../store/reportstore';
import { notificationService } from '../services/notificationservice';
import { useState } from 'react';
import Statistics from '../components/dashboard/statistics';
import RecentIdeas from '../components/dashboard/recentideas';
import ActivityTimeline from '../components/dashboard/activitytime';
import DashboardCard from '../components/dashboard/dashboardcard';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';

export default function Dashboard() {
  const { ideas, loading, getMyIdeas } = useStartupStore();
  const { reports, getMyReports } = useReportStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyIdeas({ limit: 50 });
    getMyReports();
    notificationService.list().then(({ data }) => setNotifications(data.data.notifications)).catch(() => {});
  }, [getMyIdeas, getMyReports]);

  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of your startup idea validations.</p>
          </div>
          <Link to="/analyze" className="btn-primary"><Plus className="h-4 w-4" /> New Idea</Link>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Statistics ideas={ideas} reportsCount={reports.length} />

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <DashboardCard title="Recent Ideas" className="lg:col-span-2" action={<Link to="/my-ideas" className="text-xs font-semibold text-brand-600 hover:underline">View all</Link>}>
                <RecentIdeas ideas={ideas} />
              </DashboardCard>

              <DashboardCard title="Recent Activity">
                <ActivityTimeline notifications={notifications} />
              </DashboardCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
