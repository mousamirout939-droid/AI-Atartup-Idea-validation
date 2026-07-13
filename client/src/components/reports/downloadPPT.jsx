import { useState } from 'react';
import { Presentation } from 'lucide-react';
import toast from 'react-hot-toast';
import { useReportStore } from '../../store/reportstore';
import Button from '../common/button';

export default function DownloadPPT({ ideaId }) {
  const { exportPPT } = useReportStore();
  const [loading, setLoading] = useState(false);
  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/api$/, '');

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { url } = await exportPPT(ideaId);
      window.open(`${apiBase}${url}`, '_blank');
      toast.success('Pitch deck exported as PPTX');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to export PPTX');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="secondary" icon={Presentation} loading={loading} onClick={handleDownload}>
      Download Pitch Deck
    </Button>
  );
}
