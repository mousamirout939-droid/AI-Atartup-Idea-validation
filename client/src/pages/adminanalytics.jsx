import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';
import FeedbackTable from '../components/admin/feedbacktable';
import { useAdminStore } from '../store/adminstore';

const COLORS = ['#6247ff', '#8177ff', '#aaa6ff', '#059669', '#f59e0b'];

export default function AdminAnalytics() {
  const { analytics, loading, getAnalytics, feedback, getFeedback } = useAdminStore();

  useEffect(() => {
    getAnalytics();
    getFeedback();
  }, [getAnalytics, getFeedback]);

  if (loading || !analytics) return <div className="flex"><Sidebar variant="admin" /><div className="flex-1 p-10"><Loader /></div></div>;

  const signupsData = analytics.signupsLast30Days.map((s) => ({ date: s._id.slice(5), signups: s.count }));
  const planData = analytics.planBreakdown.map((p) => ({ name: p._id, value: p.count }));

  return (
    <div className="flex">
      <Sidebar variant="admin" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="mb-6 font-display text-2xl font-bold text-gray-900">Deep Analytics</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="mb-4 font-display font-semibold text-gray-900">Signups (Last 30 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={signupsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="signups" fill="#6247ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="mb-4 font-display font-semibold text-gray-900">Plan Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={planData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {planData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card mt-6 p-6">
          <h3 className="mb-4 font-display font-semibold text-gray-900">Recent Feedback</h3>
          <FeedbackTable feedback={feedback} />
        </div>
      </div>
    </div>
  );
}
