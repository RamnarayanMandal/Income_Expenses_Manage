import axios from 'axios';

// Get API URL from environment variable or use default
const envApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// Ensure baseURL ends with /api
const API_URL = envApiUrl.endsWith('/api') ? envApiUrl : `${envApiUrl}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Debug: log the baseURL in development
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_URL);
}

// Request interceptor (can be used for auth tokens later)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    }
    return Promise.reject(error);
  }
);

export default api;



