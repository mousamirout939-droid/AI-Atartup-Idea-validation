import api from '../utils/api';

export const reportService = {
  list: () => api.get('/reports'),
  exportPDF: (ideaId) => api.post(`/reports/${ideaId}/export-pdf`),
};
