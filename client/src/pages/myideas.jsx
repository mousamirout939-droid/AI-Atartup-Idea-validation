import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../components/common/sidebar';
import SearchBar from '../components/common/searchbar';
import Pagination from '../components/common/pagination';
import IdeaHistory from '../components/startup/ideahistory';
import Loader from '../components/common/loader';
import { useStartupStore } from '../store/startupstore';

export default function MyIdeas() {
  const { ideas, loading, total, pages, getMyIdeas, deleteIdea } = useStartupStore();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMyIdeas({ page, search });
  }, [page, search, getMyIdeas]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this idea and all its analyses? This cannot be undone.')) return;
    try {
      await deleteIdea(id);
      toast.success('Idea deleted');
    } catch {
      toast.error('Failed to delete idea');
    }
  };

  return (
    <div className="flex">
      <Sidebar variant="user" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900">My Ideas</h1>
            <p className="text-sm text-gray-500">{total} idea{total !== 1 ? 's' : ''} submitted</p>
          </div>
          <div className="w-full sm:w-72">
            <SearchBar value={search} onChange={setSearch} placeholder="Search your ideas..." />
          </div>
        </div>

        {loading ? <Loader /> : <IdeaHistory ideas={ideas} onDelete={handleDelete} />}
        <Pagination page={page} pages={pages} onChange={setPage} />
      </div>
    </div>
  );
}
