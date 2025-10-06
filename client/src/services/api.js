import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '../utils/constants';

/**
 * Create Axios instance with default configuration
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Request Interceptor
 * Automatically attach JWT token to requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    // If token exists, add to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    // Return data directly
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized - token expired or invalid
      if (status === 401) {
        // Clear token and user data
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject({
          message: 'Session expired. Please login again.',
          status: 401
        });
      }
      
      // Handle 403 Forbidden
      if (status === 403) {
        return Promise.reject({
          message: data.message || 'Access denied',
          status: 403
        });
      }
      
      // Handle 404 Not Found
      if (status === 404) {
        return Promise.reject({
          message: data.message || 'Resource not found',
          status: 404
        });
      }
      
      // Handle 500 Server Error
      if (status >= 500) {
        return Promise.reject({
          message: 'Server error. Please try again later.',
          status: status
        });
      }
      
      // Return error message from server
      return Promise.reject({
        message: data.message || 'An error occurred',
        status: status
      });
      
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        status: 0
      });
      
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        status: 0
      });
    }
  }
);

export default api;