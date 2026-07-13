import IdeaCard from './ideacard';
import EmptyState from '../common/emptystate';
import { Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IdeaHistory({ ideas, onDelete }) {
  if (!ideas?.length) {
    return (
      <EmptyState
        icon={Lightbulb}
        title="No ideas yet"
        description="Submit your first startup idea and get a full AI-powered validation report in minutes."
        action={<Link to="/analyze" className="btn-primary">Submit an Idea</Link>}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => <IdeaCard key={idea._id} idea={idea} onDelete={onDelete} />)}
    </div>
  );
}
