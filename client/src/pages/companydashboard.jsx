import { useEffect, useState } from 'react';
import { Search, Users, Lightbulb } from 'lucide-react';
import Sidebar from '../components/common/sidebar';
import Loader from '../components/common/loader';
import CompanyIdeaTable from '../components/company/ideatable';
import api from '../utils/api';

export default function CompanyDashboard() {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.get('/company/ideas', { params: { search, limit: 100 } })
      .then(({ data }) => { if (active) setIdeas(data.data.ideas); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [search]);

  const submitters = new Set(ideas.map((idea) => idea.user?._id)).size;

  return (
    <div className="flex">
      <Sidebar variant="company" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Company workspace</p><h1 className="mt-2 font-display text-2xl font-bold text-gray-900">Submitted ideas</h1><p className="mt-1 text-sm text-gray-500">Review who submitted each startup idea and its validation progress.</p></div>
          <div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input className="input pl-9" placeholder="Search ideas..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2"><div className="card flex items-center gap-4 p-5"><Lightbulb className="h-5 w-5 text-brand-600" /><div><p className="text-2xl font-bold text-gray-900">{ideas.length}</p><p className="text-xs text-gray-500">Ideas submitted</p></div></div><div className="card flex items-center gap-4 p-5"><Users className="h-5 w-5 text-emerald-600" /><div><p className="text-2xl font-bold text-gray-900">{submitters}</p><p className="text-xs text-gray-500">Unique submitters</p></div></div></div>
        <div className="card p-6">{loading ? <Loader label="Loading submissions..." /> : <CompanyIdeaTable ideas={ideas} />}</div>
      </div>
    </div>
  );
}