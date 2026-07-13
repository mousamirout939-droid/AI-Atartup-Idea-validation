const groups = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'hosting', label: 'Hosting' },
  { key: 'thirdPartyServices', label: '3rd-Party Services' },
];

export default function TechStackSuggestion({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ key, label }) => (
          <div key={key} className="rounded-2xl border border-gray-100 p-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-900">{label}</h4>
            <div className="flex flex-wrap gap-1.5">
              {(data[key] || []).map((item, i) => (
                <span key={i} className="badge bg-brand-50 text-brand-700">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-gray-50 p-5">
        <p className="text-sm font-semibold text-gray-900">Estimated Build Time: <span className="text-brand-600">{data.estimatedBuildTime}</span></p>
        <p className="mt-2 text-sm text-gray-600">{data.reasoning}</p>
      </div>
    </div>
  );
}
