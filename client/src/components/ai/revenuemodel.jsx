import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

export default function RevenueModel({ data }) {
  if (!data) return null;

  const chartData = (data.projections || []).map((p) => ({ name: `Year ${p.year}`, Revenue: p.revenue, Customers: p.customers }));

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Primary Model</p>
          <p className="mt-1 font-display text-lg font-bold text-brand-900">{data.primaryModel}</p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Pricing Strategy</p>
          <p className="mt-1 text-sm text-gray-700">{data.pricingStrategy}</p>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="mt-6 h-64 rounded-2xl border border-gray-100 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="Revenue" fill="#6247ff" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Suggested Models</h4>
          <div className="flex flex-wrap gap-2">
            {(data.suggestedModels || []).map((m, i) => <span key={i} className="badge bg-gray-100 text-gray-700">{m}</span>)}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Revenue Streams</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            {(data.revenueStreams || []).map((s, i) => <li key={i}>• {s}</li>)}
          </ul>
        </div>
      </div>

      {data.summary && <p className="mt-5 text-sm leading-relaxed text-gray-600">{data.summary}</p>}
    </div>
  );
}
