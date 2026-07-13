import { create } from 'zustand';
import api from '../utils/api';

export const useAdminStore = create((set) => ({
  analytics: null,
  users: [],
  ideas: [],
  feedback: [],
  payments: [],
  loading: false,
  error: null,

  getAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/admin/analytics');
      set({ analytics: data.data.analytics, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to load analytics', loading: false });
    }
  },

  getUsers: async (params = {}) => {
    set({ loading: true });
    const { data } = await api.get('/admin/users', { params });
    set({ users: data.data.users, loading: false });
  },

  toggleUserStatus: async (id) => {
    const { data } = await api.put(`/admin/users/${id}/toggle-status`);
    set((state) => ({ users: state.users.map((u) => (u._id === id ? data.data.user : u)) }));
  },

  getIdeas: async (params = {}) => {
    set({ loading: true });
    const { data } = await api.get('/admin/ideas', { params });
    set({ ideas: data.data.ideas, loading: false });
  },

  deleteIdea: async (id) => {
    await api.delete(`/admin/ideas/${id}`);
    set((state) => ({ ideas: state.ideas.filter((i) => i._id !== id) }));
  },

  getFeedback: async () => {
    set({ loading: true });
    const { data } = await api.get('/admin/feedback');
    set({ feedback: data.data.feedback, loading: false });
  },

  getPayments: async () => {
    const { data } = await api.get('/admin/payments');
    set({ payments: data.data.payments });
  },
}));
