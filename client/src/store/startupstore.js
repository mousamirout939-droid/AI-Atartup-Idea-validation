import { create } from 'zustand';
import api from '../utils/api';

export const useStartupStore = create((set, get) => ({
  ideas: [],
  currentIdea: null,
  analyses: {},
  total: 0,
  pages: 1,
  loading: false,
  analyzing: false,
  error: null,

  createIdea: async (payload) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/startups', payload);
      set((state) => ({ ideas: [data.data.idea, ...state.ideas], loading: false }));
      return data.data.idea;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to create idea', loading: false });
      throw error;
    }
  },

  getMyIdeas: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/startups', { params });
      set({ ideas: data.data.ideas, total: data.data.total, pages: data.data.pages, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch ideas', loading: false });
    }
  },

  getIdeaById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/startups/${id}`);
      set({ currentIdea: data.data.idea, analyses: data.data.analyses, loading: false });
      return data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch idea', loading: false });
      throw error;
    }
  },

  analyzeIdea: async (id) => {
    set({ analyzing: true, error: null });
    try {
      const { data } = await api.post(`/startups/${id}/analyze`);
      set({
        currentIdea: data.data.idea,
        analyses: data.data.analyses,
        analyzing: false,
      });
      return data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Analysis failed', analyzing: false });
      throw error;
    }
  },

  deleteIdea: async (id) => {
    await api.delete(`/startups/${id}`);
    set((state) => ({ ideas: state.ideas.filter((i) => i._id !== id) }));
  },

  generatePitchDeck: async (id) => {
    const { data } = await api.post(`/pitchdeck/${id}/generate`);
    return data.data.pitchDeck;
  },

  reset: () => set({ currentIdea: null, analyses: {} }),
}));
