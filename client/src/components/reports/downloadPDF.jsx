import { useState } from 'react';
import { FileDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useReportStore } from '../../store/reportstore';
import Button from '../common/button';
import { apiOrigin } from '../../utils/api';

export default function DownloadPDF({ ideaId }) {
  const { exportPDF } = useReportStore();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { url } = await exportPDF(ideaId);
      window.open(`${apiOrigin}${url}`, '_blank');
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
