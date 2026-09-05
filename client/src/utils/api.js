import axios from 'axios';

const PRODUCTION_FALLBACK_URL = 'https://ai-atartup-idea-validation.onrender.com/api';

const baseURL = import.meta.env.VITE_API_URL || PRODUCTION_FALLBACK_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

function getStoredToken() {
  if (typeof window === 'undefined') return null;

  const flat = localStorage.getItem('token');
  if (flat) return flat;

  const persisted = localStorage.getItem('auth-storage');
  if (persisted) {
    try {
      const parsed = JSON.parse(persisted);
      return parsed?.state?.token || parsed?.token || null;
    } catch {
      return null;
    }
  }

  return null;
}

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRedirectingToLogin = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.config?.url);
    } else if (!error.response) {
      console.error('Network error, no response received:', error.config?.url, error.message);
    } else {
      console.error(
        `API error ${error.response.status} on ${error.config?.url}:`,
        error.response.data
      );
    }

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('auth-storage');

      if (!isRedirectingToLogin && !window.location.pathname.startsWith('/login')) {
        isRedirectingToLogin = true;
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;