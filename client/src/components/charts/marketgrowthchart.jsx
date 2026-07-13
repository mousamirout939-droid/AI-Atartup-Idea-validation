import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Renders a simple illustrative growth curve derived from the opportunity
// score, since the AI response gives a snapshot rather than a time series.
export default function MarketGrowthChart({ opportunityScore = 50 }) {
  const data = Array.from({ length: 6 }, (_, i) => ({
    period: `Y${i + 1}`,
    growth: Math.round(opportunityScore * (0.5 + i * 0.15)),
  }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6247ff" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6247ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="period" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="growth" stroke="#6247ff" fill="url(#growthFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
