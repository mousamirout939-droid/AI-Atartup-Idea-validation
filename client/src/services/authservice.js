// Thin convenience wrappers around the authstore's API calls, kept for
// components/pages that prefer calling a service function directly instead
// of pulling every method off the store.
import { useAuthStore } from '../store/authstore';

export const authService = {
  register: (payload) => useAuthStore.getState().register(payload),
  login: (payload) => useAuthStore.getState().login(payload),
  logout: () => useAuthStore.getState().logout(),
  forgotPassword: (email) => useAuthStore.getState().forgotPassword(email),
  resetPassword: (token, password) => useAuthStore.getState().resetPassword(token, password),
};
