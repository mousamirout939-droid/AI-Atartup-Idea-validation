import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

export default function SWOTChart({ data }) {
  if (!data) return null;

  const chartData = [
    { subject: 'Strengths', count: data.strengths?.length || 0 },
    { subject: 'Weaknesses', count: data.weaknesses?.length || 0 },
    { subject: 'Opportunities', count: data.opportunities?.length || 0 },
    { subject: 'Threats', count: data.threats?.length || 0 },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#4b5563' }} />
          <PolarRadiusAxis tick={{ fontSize: 10 }} />
          <Radar dataKey="count" stroke="#6247ff" fill="#6247ff" fillOpacity={0.35} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
