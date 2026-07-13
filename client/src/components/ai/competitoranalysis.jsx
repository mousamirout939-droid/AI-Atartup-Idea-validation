export default function CompetitorAnalysis({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {(data.competitors || []).map((c, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 p-4">
            <h4 className="font-display font-semibold text-gray-900">{c.name}</h4>
            <p className="mt-1 text-xs text-gray-500">{c.description}</p>
            <p className="mt-2 text-xs font-medium text-brand-600">Market share: {c.estimatedMarketShare}</p>
            <div className="mt-3 space-y-1">
              {(c.strengths || []).slice(0, 2).map((s, j) => (
                <p key={j} className="text-xs text-emerald-700">+ {s}</p>
              ))}
              {(c.weaknesses || []).slice(0, 2).map((w, j) => (
                <p key={j} className="text-xs text-red-600">− {w}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-brand-50 p-5">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-brand-900">Your Competitive Advantage</h4>
          <span className="badge bg-white text-brand-700">Score: {data.differentiationScore}/100</span>
        </div>
        <p className="mt-2 text-sm text-brand-800">{data.competitiveAdvantage}</p>
      </div>

      {data.summary && <p className="mt-4 text-sm leading-relaxed text-gray-600">{data.summary}</p>}
    </div>
  );
}
