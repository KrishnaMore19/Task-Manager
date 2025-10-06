import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as authService from '../services/authService';
import { STORAGE_KEYS, TOAST_MESSAGES } from '../utils/constants';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check authentication status
   */
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        // Verify token with backend
        const response = await authService.getMe();
        if (response.success) {
          setUser(response.data);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Email and password
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);

      if (response.success) {
        const { token, ...userData } = response.data;
        
        // Store token and user data
        authService.setToken(token);
        authService.setStoredUser(userData);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_AUTH);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - Name, email, and password
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.signup(userData);

      if (response.success) {
        const { token, ...user } = response.data;
        
        // Store token and user data
        authService.setToken(token);
        authService.setStoredUser(user);
        
        setUser(user);
        setIsAuthenticated(true);
        
        toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      
      // Clear storage
      authService.removeToken();
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      
      // Force logout even if API call fails
      authService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile
   * @param {Object} updates - User data to update
   */
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    authService.setStoredUser(updatedUser);
  };

  // Context value
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};