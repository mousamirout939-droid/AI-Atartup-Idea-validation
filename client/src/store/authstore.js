import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: true,
      error: null,

      init: async () => {
        const token = get().token || localStorage.getItem('token');
        if (!token) {
          set({ loading: false });
          return;
        }
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.data.user, token, loading: false });
        } catch {
          set({ user: null, token: null, loading: false });
          localStorage.removeItem('token');
        }
      },

      register: async (payload) => {
        set({ error: null });
        const { data } = await api.post('/auth/register', payload);
        localStorage.setItem('token', data.data.token);
        set({ user: data.data.user, token: data.data.token });
        return data.data.user;
      },

      login: async (payload) => {
        set({ error: null });
        const { data } = await api.post('/auth/login', payload);
        localStorage.setItem('token', data.data.token);
        set({ user: data.data.user, token: data.data.token });
        return data.data.user;
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },

      updateUser: (partialUser) => set((state) => ({ user: { ...state.user, ...partialUser } })),

      forgotPassword: async (email) => api.post('/auth/forgot-password', { email }),
      resetPassword: async (token, password) => api.post('/auth/reset-password', { token, password }),
    }),
    { name: 'auth-storage', partialize: (state) => ({ token: state.token }) }
  )
);
