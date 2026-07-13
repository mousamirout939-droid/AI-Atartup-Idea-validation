import api from '../utils/api';

// Individual per-module regeneration endpoints, useful for "re-run just this
// section" buttons instead of re-running the entire suite.
export const aiService = {
  swot: {
    generate: (ideaId) => api.post(`/swot/${ideaId}/generate`),
    get: (ideaId) => api.get(`/swot/${ideaId}`),
  },
  market: {
    generate: (ideaId) => api.post(`/market/${ideaId}/generate`),
    get: (ideaId) => api.get(`/market/${ideaId}`),
  },
  competitor: {
    generate: (ideaId) => api.post(`/competitor/${ideaId}/generate`),
    get: (ideaId) => api.get(`/competitor/${ideaId}`),
  },
  investor: {
    generate: (ideaId) => api.post(`/investor/${ideaId}/generate`),
    get: (ideaId) => api.get(`/investor/${ideaId}`),
  },
  revenue: {
    generate: (ideaId) => api.post(`/revenue/${ideaId}/generate`),
    get: (ideaId) => api.get(`/revenue/${ideaId}`),
  },
  cost: {
    generate: (ideaId) => api.post(`/cost/${ideaId}/generate`),
    get: (ideaId) => api.get(`/cost/${ideaId}`),
  },
  techstack: {
    generate: (ideaId) => api.post(`/techstack/${ideaId}/generate`),
    get: (ideaId) => api.get(`/techstack/${ideaId}`),
  },
  pitchdeck: {
    generate: (ideaId) => api.post(`/pitchdeck/${ideaId}/generate`),
    get: (ideaId) => api.get(`/pitchdeck/${ideaId}`),
    exportPPT: (ideaId) => api.post(`/pitchdeck/${ideaId}/export-ppt`),
  },
};
