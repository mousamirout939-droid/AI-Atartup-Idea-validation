import axios from 'axios';

// FORCE the production URL. We are not using process.env or import.meta.env
// to ensure Vercel cannot possibly use the wrong address.
const baseURL = 'https://ai-atartup-idea-validation.onrender.com/api';

const api = axios.create({
  baseURL: baseURL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  },
  timeout: 15000, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth-storage');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;