const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

/**
 * Task Routes
 * All routes are protected - require authentication
 */

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user (with optional filters)
// @access  Private
// @query   status (optional) - Filter by status: Incomplete, Completed, All
// @query   priority (optional) - Filter by priority: Low, Medium, High, All
// @query   search (optional) - Search tasks by title
router.get('/', protect, getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', protect, createTask);

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', protect, getTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', protect, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', protect, deleteTask);

module.exports = router;