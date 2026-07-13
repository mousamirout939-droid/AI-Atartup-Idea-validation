import axios from 'axios';

const baseURL = 'https://ai-atartup-idea-validation.onrender.com/api';

const api = axios.create({
  baseURL: baseURL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  },
  // Increased to 30s to prevent premature timeout errors
  timeout: 30000, 
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
    // Handle timeout error specifically
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out.');
    }
    
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