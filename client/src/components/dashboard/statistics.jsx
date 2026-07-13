import { Lightbulb, CheckCircle2, TrendingUp, FileText } from 'lucide-react';

export default function Statistics({ ideas = [], reportsCount = 0 }) {
  const total = ideas.length;
  const completed = ideas.filter((i) => i.status === 'completed').length;
  const avgScore = completed
    ? Math.round(ideas.filter((i) => i.viabilityScore != null).reduce((sum, i) => sum + i.viabilityScore, 0) / completed)
    : 0;

  const stats = [
    { label: 'Total Ideas', value: total, icon: Lightbulb, color: 'bg-brand-50 text-brand-600' },
    { label: 'Completed Analyses', value: completed, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg. Viability Score', value: `${avgScore}/100`, icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
    { label: 'Reports Generated', value: reportsCount, icon: FileText, color: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
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
