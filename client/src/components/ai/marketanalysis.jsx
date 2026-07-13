export default function MarketAnalysis({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-brand-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Market Size</p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-900">{data.marketSize}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">Growth Rate</p>
          <p className="mt-1 font-display text-2xl font-bold text-emerald-900">{data.growthRate}</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Opportunity Score</p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-900">{data.opportunityScore}/100</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Target Audience</h4>
          <p className="text-sm text-gray-600">{data.targetAudience}</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Entry Barriers</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {(data.barriers || []).map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="mb-2 text-sm font-semibold text-gray-900">Key Trends</h4>
        <div className="flex flex-wrap gap-2">
          {(data.trends || []).map((t, i) => (
            <span key={i} className="badge bg-gray-100 text-gray-700">{t}</span>
          ))}
        </div>
      </div>

      {data.summary && <p className="mt-5 text-sm leading-relaxed text-gray-600">{data.summary}</p>}
    </div>
  );
}
