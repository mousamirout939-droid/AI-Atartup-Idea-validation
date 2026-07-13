import { formatDate } from '../../utils/formatters';
import { Bell, Lightbulb, CreditCard } from 'lucide-react';

const iconMap = {
  analysis_complete: Lightbulb,
  payment_success: CreditCard,
  system: Bell,
};

export default function ActivityTimeline({ notifications = [] }) {
  if (!notifications.length) {
    return <p className="py-6 text-center text-sm text-gray-400">No recent activity yet.</p>;
  }

  return (
    <div className="space-y-4">
      {notifications.slice(0, 8).map((n) => {
        const Icon = iconMap[n.type] || Bell;
        return (
          <div key={n._id} className="flex gap-3">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.isRead ? 'bg-gray-100 text-gray-400' : 'bg-brand-50 text-brand-600'}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{n.title}</p>
              <p className="text-xs text-gray-500">{n.message}</p>
              <p className="mt-0.5 text-[11px] text-gray-400">{formatDate(n.createdAt)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
