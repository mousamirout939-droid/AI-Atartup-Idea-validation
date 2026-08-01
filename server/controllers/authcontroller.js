import axios from 'axios';

// Reads the API base URL from the build-time env var, falling back to the
// known-good production URL if it's missing (e.g. env var not configured
// on Vercel yet). This keeps deploys working today while letting you set
// VITE_API_URL (Vite) / NEXT_PUBLIC_API_URL (Next.js) properly going forward
// instead of hardcoding the URL forever.
const PRODUCTION_FALLBACK_URL = 'https://ai-atartup-idea-validation.onrender.com/api';

const baseURL =
  import.meta.env?.VITE_API_URL ||
  process.env?.NEXT_PUBLIC_API_URL ||
  PRODUCTION_FALLBACK_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;