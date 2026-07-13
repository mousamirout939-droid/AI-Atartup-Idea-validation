import { scoreColor, scoreBadgeColor } from '../../utils/formatters';

const criteriaLabels = {
  marketPotential: 'Market Potential',
  teamFeasibility: 'Team Feasibility',
  innovation: 'Innovation',
  scalability: 'Scalability',
  revenueModel: 'Revenue Model',
};

export default function InvestorScore({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-gray-900 p-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm text-gray-300">Investor Readiness</p>
          <p className="font-display text-xl font-bold">{data.investmentReadiness}</p>
        </div>
        <div className={`font-display text-5xl font-extrabold ${scoreColor(data.overallScore).replace('text-', 'text-')}`}>
          {data.overallScore}<span className="text-2xl text-gray-400">/100</span>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {Object.entries(data.criteria || {}).map(([key, value]) => (
          <div key={key}>
            <div className="mb-1 flex justify-between text-xs font-medium text-gray-600">
              <span>{criteriaLabels[key] || key}</span>
              <span>{value}/100</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <h4 className="text-sm font-semibold text-emerald-800">Strengths</h4>
          <ul className="mt-2 space-y-1 text-sm text-emerald-700">
            {(data.strengths || []).map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl bg-amber-50 p-4">
          <h4 className="text-sm font-semibold text-amber-800">Concerns</h4>
          <ul className="mt-2 space-y-1 text-sm text-amber-700">
            {(data.concerns || []).map((c, i) => <li key={i}>• {c}</li>)}
          </ul>
        </div>
      </div>

      {data.recommendation && (
        <div className={`mt-4 rounded-2xl border p-4 text-sm ${scoreBadgeColor(data.overallScore)}`}>
          {data.recommendation}
        </div>
      )}
    </div>
  );
}
