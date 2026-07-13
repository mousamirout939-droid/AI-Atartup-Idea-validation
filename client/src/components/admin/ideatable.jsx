import { Trash2 } from 'lucide-react';
import { formatDate, scoreBadgeColor } from '../../utils/formatters';

export default function IdeaTable({ ideas = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
            <th className="py-3 pr-4 font-medium">Title</th>
            <th className="py-3 pr-4 font-medium">Owner</th>
            <th className="py-3 pr-4 font-medium">Industry</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 font-medium">Score</th>
            <th className="py-3 pr-4 font-medium">Created</th>
            <th className="py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {ideas.map((idea) => (
            <tr key={idea._id}>
              <td className="py-3 pr-4 font-medium text-gray-900">{idea.title}</td>
              <td className="py-3 pr-4 text-gray-500">{idea.user?.name || '—'}</td>
              <td className="py-3 pr-4 text-gray-500">{idea.industry}</td>
              <td className="py-3 pr-4 capitalize text-gray-500">{idea.status}</td>
              <td className="py-3 pr-4">
                {idea.viabilityScore != null ? (
                  <span className={`badge ${scoreBadgeColor(idea.viabilityScore)}`}>{idea.viabilityScore}</span>
                ) : '—'}
              </td>
              <td className="py-3 pr-4 text-gray-500">{formatDate(idea.createdAt)}</td>
              <td className="py-3">
                <button onClick={() => onDelete(idea._id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
