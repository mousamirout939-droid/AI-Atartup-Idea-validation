import { CheckCircle2 } from 'lucide-react';

export default function BusinessRoadmap({ milestones = [] }) {
  if (!milestones.length) return null;

  return (
    <div className="relative pl-6">
      <div className="absolute bottom-1 left-2 top-1 w-px bg-gray-200" />
      <div className="space-y-6">
        {milestones.map((m, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 ring-4 ring-brand-100">
              <CheckCircle2 className="h-3 w-3 text-white" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{m.timeline}</p>
            <p className="text-sm font-medium text-gray-900">{m.milestone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
