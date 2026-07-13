import { useEffect } from 'react';
import { FileText, FileDown, Presentation } from 'lucide-react';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';
import EmptyState from '../components/common/emptystate';
import { useReportStore } from '../store/reportstore';
import { formatDate } from '../utils/formatters';

export default function Reports() {
  const { reports, loading, getMyReports } = useReportStore();
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/api$/, '');

  useEffect(() => { getMyReports(); }, [getMyReports]);

  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="font-display text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">All your exported PDF reports and pitch decks.</p>

        <div className="mt-6">
          {loading ? (
            <Loader />
          ) : !reports.length ? (
            <EmptyState icon={FileText} title="No reports yet" description="Export a PDF or pitch deck from any analyzed idea to see it here." />
          ) : (
            <div className="card divide-y divide-gray-100 p-0">
              {reports.map((r) => (
                <a
                  key={r._id}
                  href={`${apiBase}${r.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      {r.format === 'pdf' ? <FileDown className="h-5 w-5" /> : <Presentation className="h-5 w-5" />}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{r.idea?.title || 'Untitled Idea'}</p>
                      <p className="text-xs text-gray-500">{r.format.toUpperCase()} · {formatDate(r.createdAt)}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-600">Download</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
