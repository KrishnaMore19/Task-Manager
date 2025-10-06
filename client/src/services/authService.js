import api from './api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} - User data and token
 */
export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} - User data and token
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} - Logout confirmation
 */
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<Object>} - User profile data
 */
export const getMe = async () => {
  try {
    const response = await api.get('/auth/me');
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify if user is authenticated
 * @returns {boolean} - True if token exists
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('taskManagerToken');
  return !!token;
};

/**
 * Get stored token
 * @returns {string|null} - JWT token or null
 */
export const getToken = () => {
  return localStorage.getItem('taskManagerToken');
};

/**
 * Store token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
  localStorage.setItem('taskManagerToken', token);
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('taskManagerToken');
  localStorage.removeItem('taskManagerUser');
};

/**
 * Get stored user data
 * @returns {Object|null} - User data or null
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('taskManagerUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Store user data in localStorage
 * @param {Object} user - User data
 */
export const setStoredUser = (user) => {
  localStorage.setItem('taskManagerUser', JSON.stringify(user));
};