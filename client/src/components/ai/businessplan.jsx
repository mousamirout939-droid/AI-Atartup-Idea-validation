export default function BusinessPlanView({ data }) {
  if (!data) return null;

  const sections = [
    ['Executive Summary', data.executiveSummary],
    ['Problem Statement', data.problemStatement],
    ['Solution', data.solution],
    ['Business Model', data.businessModel],
    ['Marketing Strategy', data.marketingStrategy],
  ];

  return (
    <div className="space-y-5">
      {sections.map(([title, text]) => (
        text && (
          <div key={title}>
            <h4 className="mb-1.5 text-sm font-semibold text-gray-900">{title}</h4>
            <p className="text-sm leading-relaxed text-gray-600">{text}</p>
          </div>
        )
      ))}

      {data.milestones?.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Milestones</h4>
          <ul className="space-y-1.5">
            {data.milestones.map((m, i) => (
              <li key={i} className="flex justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                <span className="text-gray-700">{m.milestone}</span>
                <span className="font-medium text-brand-600">{m.timeline}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.risksAndMitigation?.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Risks & Mitigation</h4>
          <div className="space-y-2">
            {data.risksAndMitigation.map((r, i) => (
              <div key={i} className="rounded-lg border border-amber-100 bg-amber-50 p-3 text-sm">
                <p className="font-medium text-amber-900">{r.risk}</p>
                <p className="mt-0.5 text-amber-700">{r.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
