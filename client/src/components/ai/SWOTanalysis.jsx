import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';

const quadrants = [
  { key: 'strengths', label: 'Strengths', icon: TrendingUp, color: 'emerald' },
  { key: 'weaknesses', label: 'Weaknesses', icon: TrendingDown, color: 'red' },
  { key: 'opportunities', label: 'Opportunities', icon: Target, color: 'blue' },
  { key: 'threats', label: 'Threats', icon: AlertTriangle, color: 'amber' },
];

const colorMap = {
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
};

export default function SWOTAnalysis({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {quadrants.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className={`rounded-2xl border p-5 ${colorMap[color]}`}>
            <div className="mb-3 flex items-center gap-2 font-display font-semibold">
              <Icon className="h-4 w-4" /> {label}
            </div>
            <ul className="space-y-2 text-sm">
              {(data[key] || []).map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {data.summary && <p className="mt-4 text-sm leading-relaxed text-gray-600">{data.summary}</p>}
    </div>
  );
}
