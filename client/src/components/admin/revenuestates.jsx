import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export default function RevenueStats({ payments = [] }) {
  const byPlan = payments.reduce((acc, p) => {
    acc[p.plan] = (acc[p.plan] || 0) + p.amount;
    return acc;
  }, {});

  const chartData = Object.entries(byPlan).map(([plan, amount]) => ({ plan, amount: amount / 100 }));

  if (!chartData.length) return <p className="py-6 text-center text-sm text-gray-400">No payments recorded yet.</p>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="plan" tick={{ fontSize: 12 }} className="capitalize" />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCurrency(v, 'INR')} />
          <Tooltip formatter={(v) => formatCurrency(v, 'INR')} />
          <Bar dataKey="amount" fill="#6247ff" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
