import { formatDate } from '../../utils/formatters';

const statusStyles = {
  new: 'bg-blue-50 text-blue-700',
  reviewed: 'bg-amber-50 text-amber-700',
  resolved: 'bg-emerald-50 text-emerald-700',
};

export default function FeedbackTable({ feedback = [] }) {
  return (
    <div className="space-y-3">
      {feedback.map((f) => (
        <div key={f._id} className="rounded-xl border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">{f.name} <span className="font-normal text-gray-400">· {f.email}</span></p>
            <span className={`badge ${statusStyles[f.status]}`}>{f.status}</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">{f.subject} · {formatDate(f.createdAt)}</p>
          <p className="mt-2 text-sm text-gray-600">{f.message}</p>
        </div>
      ))}
      {!feedback.length && <p className="py-6 text-center text-sm text-gray-400">No feedback submitted yet.</p>}
    </div>
  );
}
