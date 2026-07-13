export default function DashboardCard({ title, action, children, className = '' }) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-semibold text-gray-900">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
