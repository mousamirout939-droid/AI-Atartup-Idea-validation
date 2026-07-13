import { CheckCircle2, Circle } from 'lucide-react';

const modules = [
  { key: 'swot', label: 'SWOT Analysis' },
  { key: 'market', label: 'Market Analysis' },
  { key: 'competitor', label: 'Competitor Analysis' },
  { key: 'investor', label: 'Investor Score' },
  { key: 'revenue', label: 'Revenue Model' },
  { key: 'cost', label: 'Cost Estimate' },
  { key: 'techstack', label: 'Tech Stack' },
  { key: 'businessplan', label: 'Business Plan' },
  { key: 'pitchdeck', label: 'Pitch Deck' },
];

export default function StartupSummary({ analysisModules = {} }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {modules.map(({ key, label }) => {
        const done = analysisModules[key];
        return (
          <div key={key} className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-medium ${done ? 'border-emerald-100 bg-emerald-50 text-emerald-700' : 'border-gray-100 bg-gray-50 text-gray-400'}`}>
            {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            {label}
          </div>
        );
      })}
    </div>
  );
}
