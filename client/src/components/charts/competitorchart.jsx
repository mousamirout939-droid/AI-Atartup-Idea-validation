import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CompetitorChart({ data }) {
  if (!data?.competitors?.length) return null;

  const chartData = data.competitors.map((c) => ({
    name: c.name,
    share: parseFloat(String(c.estimatedMarketShare).replace(/[^0-9.]/g, '')) || 0,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis type="number" tick={{ fontSize: 12 }} unit="%" />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={110} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="share" fill="#6247ff" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
