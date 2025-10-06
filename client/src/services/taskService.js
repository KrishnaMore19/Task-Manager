import api from './api';

/**
 * Task Service
 * Handles all task-related API calls
 */

/**
 * Get all tasks for logged-in user
 * @param {Object} filters - Optional filters
 * @param {string} filters.status - Filter by status (All, Completed, Incomplete)
 * @param {string} filters.priority - Filter by priority (All, High, Medium, Low)
 * @param {string} filters.search - Search by title
 * @returns {Promise<Object>} - Array of tasks
 */
export const getTasks = async (filters = {}) => {
  try {
    // Build query string from filters
    const params = new URLSearchParams();
    
    if (filters.status && filters.status !== 'All') {
      params.append('status', filters.status);
    }
    
    if (filters.priority && filters.priority !== 'All') {
      params.append('priority', filters.priority);
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const queryString = params.toString();
    const url = queryString ? `/tasks?${queryString}` : '/tasks';
    
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get single task by ID
 * @param {string} taskId - Task ID
 * @returns {Promise<Object>} - Task data
 */
export const getTask = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new task
 * @param {Object} taskData - Task data
 * @param {string} taskData.title - Task title
 * @param {string} taskData.description - Task description
 * @param {string} taskData.deadline - Task deadline (ISO date string)
 * @param {string} taskData.priority - Task priority (Low, Medium, High)
 * @returns {Promise<Object>} - Created task
 */
export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing task
 * @param {string} taskId - Task ID
 * @param {Object} taskData - Updated task data
 * @returns {Promise<Object>} - Updated task
 */
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a task
 * @param {string} taskId - Task ID
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Toggle task status (Complete/Incomplete)
 * @param {string} taskId - Task ID
 * @param {string} currentStatus - Current task status
 * @returns {Promise<Object>} - Updated task
 */
export const toggleTaskStatus = async (taskId, currentStatus) => {
  try {
    const newStatus = currentStatus === 'Completed' ? 'Incomplete' : 'Completed';
    const response = await api.put(`/tasks/${taskId}`, { status: newStatus });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get task statistics
 * @param {Array} tasks - Array of tasks
 * @returns {Object} - Task statistics
 */
export const getTaskStats = (tasks) => {
  if (!tasks || !Array.isArray(tasks)) {
    return {
      total: 0,
      completed: 0,
      incomplete: 0,
      overdue: 0,
      completionRate: 0
    };
  }

  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  const incomplete = tasks.filter(task => task.status === 'Incomplete').length;
  const overdue = tasks.filter(task => task.isOverdue).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    incomplete,
    overdue,
    completionRate
  };
};