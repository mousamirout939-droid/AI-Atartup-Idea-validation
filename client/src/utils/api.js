import axios from 'axios';

// Bypass environment variables for now to guarantee the URL is correct
const baseURL = 'https://ai-atartup-idea-validation.onrender.com/api';

const api = axios.create({
  baseURL: baseURL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json' 
  },
  timeout: 15000, // Increased timeout to 15s to account for Render's "cold start"
});

// ... rest of your interceptor code ...
export default api;