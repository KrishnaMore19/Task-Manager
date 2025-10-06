import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaTasks } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, validatePassword } from '../utils/helpers';
import { ANIMATION_VARIANTS } from '../utils/constants';

/**
 * Signup Page Component
 * Animated registration form with validation
 */
const Signup = () => {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary-50 via-white to-primary-50 relative overflow-hidden">
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
        className="absolute top-0 left-0 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
      />

      {/* Signup Card */}
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl mb-4 shadow-lg"
            >
              <FaTasks className="text-4xl text-white" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Start organizing your tasks today</p>
          </motion.div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 bg-white/80`}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

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

            {/* Confirm Password Input */}
            <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-primary-500 focus:ring-primary-200'
                  } focus:outline-none focus:ring-2 bg-white/80`}
                />
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
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
                className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg py-4"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Create Account
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
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-secondary-600 font-semibold hover:text-secondary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;