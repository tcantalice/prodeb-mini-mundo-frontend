import axios from 'axios';

const apiBaseUrl = (window as any).__ENV__?.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
