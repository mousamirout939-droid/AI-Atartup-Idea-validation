import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { formatDate, scoreBadgeColor, truncate } from '../../utils/formatters';

const statusStyles = {
  draft: 'bg-gray-100 text-gray-600',
  analyzing: 'bg-amber-50 text-amber-700',
  completed: 'bg-emerald-50 text-emerald-700',
  failed: 'bg-red-50 text-red-700',
};

export default function IdeaCard({ idea, onDelete }) {
  return (
    <div className="card group p-5 transition hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display font-semibold text-gray-900">{idea.title}</h3>
          <p className="mt-1 text-xs text-gray-500">{idea.industry} · {formatDate(idea.createdAt)}</p>
        </div>
        {idea.viabilityScore != null && (
          <span className={`badge shrink-0 ${scoreBadgeColor(idea.viabilityScore)}`}>{idea.viabilityScore}/100</span>
        )}
      </div>

      <p className="mt-3 text-sm text-gray-600">{truncate(idea.description, 110)}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className={`badge ${statusStyles[idea.status]}`}>{idea.status}</span>
        <div className="flex items-center gap-2">
          {onDelete && (
            <button onClick={() => onDelete(idea._id)} className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <Link to={`/ideas/${idea._id}`} className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:underline">
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
