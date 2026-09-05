import { formatDate, scoreBadgeColor } from '../../utils/formatters';

export default function CompanyIdeaTable({ ideas = [] }) {
  if (!ideas.length) return <p className="py-10 text-center text-sm text-gray-400">No submitted ideas yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
            <th className="py-3 pr-4 font-medium">Idea</th>
            <th className="py-3 pr-4 font-medium">Submitted by</th>
            <th className="py-3 pr-4 font-medium">Industry</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 font-medium">Score</th>
            <th className="py-3 font-medium">Submitted</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {ideas.map((idea) => (
            <tr key={idea._id}>
              <td className="py-3 pr-4 font-medium text-gray-900">{idea.title}</td>
              <td className="py-3 pr-4"><p className="text-gray-700">{idea.user?.name || 'Unknown'}</p><p className="text-xs text-gray-400">{idea.user?.email}</p></td>
              <td className="py-3 pr-4 text-gray-500">{idea.industry}</td>
              <td className="py-3 pr-4 capitalize text-gray-500">{idea.status}</td>
              <td className="py-3 pr-4">{idea.viabilityScore != null ? <span className={`badge ${scoreBadgeColor(idea.viabilityScore)}`}>{idea.viabilityScore}</span> : '—'}</td>
              <td className="py-3 text-gray-500">{formatDate(idea.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}