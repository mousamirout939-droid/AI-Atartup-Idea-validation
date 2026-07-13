import { useState } from 'react';
import { FileDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useReportStore } from '../../store/reportstore';
import Button from '../common/button';

export default function DownloadPDF({ ideaId }) {
  const { exportPDF } = useReportStore();
  const [loading, setLoading] = useState(false);
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/api$/, '');

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { url } = await exportPDF(ideaId);
      window.open(`${apiBase}${url}`, '_blank');
      toast.success('PDF report generated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to export PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" icon={FileDown} loading={loading} onClick={handleDownload}>
      Download PDF
    </Button>
  );
}
