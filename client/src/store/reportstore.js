import { create } from 'zustand';
import api from '../utils/api';

export const useReportStore = create((set) => ({
  reports: [],
  loading: false,
  error: null,

  getMyReports: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/reports');
      set({ reports: data.data.reports, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch reports', loading: false });
    }
  },

  exportPDF: async (ideaId) => {
    const { data } = await api.post(`/reports/${ideaId}/export-pdf`);
    return data.data;
  },

  exportPPT: async (ideaId) => {
    const { data } = await api.post(`/pitchdeck/${ideaId}/export-ppt`);
    return data.data;
  },
}));
