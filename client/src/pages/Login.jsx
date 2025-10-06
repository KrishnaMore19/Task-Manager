import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt, FaTasks } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { isValidEmail } from '../utils/helpers';
import { ANIMATION_VARIANTS } from '../utils/constants';

/**
 * Login Page Component
 * Animated login form with validation
 */
const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"
      />

      {/* Login Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="relative max-w-md w-full"
      >
        <div className="glass rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Logo and Title */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInDown}
            className="text-center mb-8"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4 shadow-lg"
            >
              <FaTasks className="text-4xl text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600">Sign in to continue to TaskFlow</p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 bg-white/80`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Input */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 bg-white/80`}
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg py-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    Sign In
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div 
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.div>

          {/* Demo Credentials (Optional - Remove in production) */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-800 text-center">
              <strong>Demo:</strong> Use any email/password (min 6 chars) to test
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;