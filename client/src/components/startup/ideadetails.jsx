import { scoreBadgeColor, formatDate } from '../../utils/formatters';

export default function IdeaDetailsHeader({ idea }) {
  if (!idea) return null;

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">{idea.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {idea.industry} · {idea.stage} · Submitted {formatDate(idea.createdAt)}
          </p>
        </div>
        {idea.viabilityScore != null && (
          <div className={`rounded-2xl px-5 py-3 text-center ${scoreBadgeColor(idea.viabilityScore)}`}>
            <p className="font-display text-3xl font-bold">{idea.viabilityScore}</p>
            <p className="text-xs font-medium">{idea.verdict}</p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{idea.description}</p>
      {idea.targetMarket && (
        <p className="mt-2 text-sm text-gray-500"><strong className="text-gray-700">Target Market:</strong> {idea.targetMarket}</p>
      )}
    </div>
  );
}
