import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../components/common/sidebar';
import IdeaTable from '../components/admin/ideatable';
import Loader from '../components/common/loader';
import { useAdminStore } from '../store/adminstore';

export default function AdminIdeas() {
  const { ideas, loading, getIdeas, deleteIdea } = useAdminStore();

  useEffect(() => { getIdeas(); }, [getIdeas]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this idea permanently?')) return;
    try {
      await deleteIdea(id);
      toast.success('Idea deleted');
    } catch {
      toast.error('Failed to delete idea');
    }
  };

  return (
    <div className="flex">
      <Sidebar variant="admin" />
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="mb-6 font-display text-2xl font-bold text-gray-900">All Ideas</h1>
        <div className="card p-6">
          {loading ? <Loader /> : <IdeaTable ideas={ideas} onDelete={handleDelete} />}
        </div>
      </div>
    </div>
  );
}
