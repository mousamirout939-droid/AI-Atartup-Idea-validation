import axios from 'axios';

const baseURL = 'https://ai-atartup-idea-validation.onrender.com/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // 30s to accommodate slow cold starts on Render's free tier.
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    // Guard against SSR/build environments where `localStorage` doesn't exist.
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Prevents multiple simultaneous 401s (e.g. several requests firing at once)
// from each triggering their own redirect/reload.
let isRedirectingToLogin = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out:', error.config?.url);
    } else if (!error.response) {
      // Network error, CORS failure, or the server being unreachable —
      // distinct from a timeout, worth logging differently.
      console.error('Network error, no response received:', error.config?.url);
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