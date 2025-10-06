import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTasks, FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/helpers';

/**
 * Navbar Component
 * Responsive navigation bar with animations
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
  };

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-primary-600 text-3xl"
            >
              <FaTasks />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/dashboard')
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  <FaTasks />
                  <span className="font-medium">Dashboard</span>
                </Link>

                {/* Profile Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleProfileMenu}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center font-bold">
                      {getInitials(user?.name)}
                    </div>
                    <span className="hidden lg:inline">{user?.name}</span>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive('/')
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 rounded-lg border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl text-gray-700 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 bg-primary-50 rounded-lg mb-2">
                      <p className="font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 transition-colors"
                    >
                      <FaTasks />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 transition-colors"
                    >
                      <FaHome />
                      <span>Home</span>
                    </Link>
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="block px-4 py-3 rounded-lg text-center border-2 border-primary-500 text-primary-500 font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={toggleMenu}
                      className="block px-4 py-3 rounded-lg text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;