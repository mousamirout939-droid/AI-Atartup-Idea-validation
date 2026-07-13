import api from '../utils/api';

export const startupService = {
  create: (payload) => api.post('/startups', payload),
  list: (params) => api.get('/startups', { params }),
  getById: (id) => api.get(`/startups/${id}`),
  update: (id, payload) => api.put(`/startups/${id}`, payload),
  remove: (id) => api.delete(`/startups/${id}`),
  analyze: (id) => api.post(`/startups/${id}/analyze`),
};
