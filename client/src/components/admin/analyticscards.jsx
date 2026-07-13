import { Users, Lightbulb, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function AnalyticsCards({ analytics }) {
  if (!analytics) return null;

  const cards = [
    { label: 'Total Users', value: analytics.totalUsers, icon: Users, color: 'bg-brand-50 text-brand-600' },
    { label: 'Total Ideas', value: analytics.totalIdeas, icon: Lightbulb, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Revenue', value: formatCurrency(analytics.totalRevenue / 100, 'INR'), icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg. Viability Score', value: `${analytics.averageViabilityScore}/100`, icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="card p-5">
          <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <p className="font-display text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
