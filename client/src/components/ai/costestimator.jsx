import { formatCurrency } from '../../utils/formatters';

export default function CostEstimator({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-brand-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Est. First-Year Cost</p>
          <p className="mt-1 font-display text-2xl font-bold text-brand-900">{formatCurrency(data.estimatedTotalFirstYear)}</p>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">Break-even</p>
          <p className="mt-1 font-display text-xl font-bold text-emerald-900">{data.breakEvenEstimate}</p>
        </div>
        <div className="rounded-2xl bg-amber-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-amber-600">Funding</p>
          <p className="mt-1 text-sm font-semibold text-amber-900">{data.fundingRecommendation}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">One-Time Costs</h4>
          <div className="space-y-1.5">
            {(data.oneTimeCosts || []).map((c, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{c.item}</span>
                <span className="font-medium text-gray-900">{formatCurrency(c.amount)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Monthly Costs</h4>
          <div className="space-y-1.5">
            {(data.monthlyCosts || []).map((c, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{c.item}</span>
                <span className="font-medium text-gray-900">{formatCurrency(c.amount)}/mo</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.summary && <p className="mt-5 text-sm leading-relaxed text-gray-600">{data.summary}</p>}
    </div>
  );
}
