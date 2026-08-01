import axios from 'axios';

const baseURL = 'https://ai-atartup-idea-validation.onrender.com/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

// Reads the token whether it's stored as a flat 'token' key, OR nested
// inside a persisted store object (e.g. Zustand persist / Redux Persist
// commonly save everything under one key like 'auth-storage').
// If your app only ever uses a flat 'token' key, the first check alone
// is enough — but this covers both so a storage-shape mismatch can't
// silently break auth.
function getStoredToken() {
  if (typeof window === 'undefined') return null;

  const flat = localStorage.getItem('token');
  if (flat) return flat;

  const persisted = localStorage.getItem('auth-storage');
  if (persisted) {
    try {
      const parsed = JSON.parse(persisted);
      // Adjust this path to match your actual store shape, e.g.
      // parsed.state.token for Zustand persist, or parsed.token directly.
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
      // Log the actual status + response body so failures are visible
      // in the console instead of just failing silently.
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