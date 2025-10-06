const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getMe,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Authentication Routes
 */

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get logged in user profile
// @access  Private
router.get('/me', protect, getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, logout);

module.exports = router;