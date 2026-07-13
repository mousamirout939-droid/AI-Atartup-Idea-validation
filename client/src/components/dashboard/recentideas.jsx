import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatDate, scoreBadgeColor } from '../../utils/formatters';
import EmptyState from '../common/emptystate';
import { Lightbulb } from 'lucide-react';

export default function RecentIdeas({ ideas = [] }) {
  if (!ideas.length) {
    return <EmptyState icon={Lightbulb} title="No ideas yet" description="Submit your first idea to see it here." />;
  }

  return (
    <div className="divide-y divide-gray-100">
      {ideas.slice(0, 5).map((idea) => (
        <Link key={idea._id} to={`/ideas/${idea._id}`} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
          <div>
            <p className="text-sm font-medium text-gray-900">{idea.title}</p>
            <p className="text-xs text-gray-500">{idea.industry} · {formatDate(idea.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            {idea.viabilityScore != null && (
              <span className={`badge ${scoreBadgeColor(idea.viabilityScore)}`}>{idea.viabilityScore}</span>
            )}
            <ArrowRight className="h-4 w-4 text-gray-300" />
          </div>
        </Link>
      ))}
    </div>
  );
}
