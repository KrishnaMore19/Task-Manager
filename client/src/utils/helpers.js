import { format, formatDistanceToNow, isPast, parseISO } from 'date-fns';

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'MMM dd, yyyy hh:mm a');
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return '';
  }
};

/**
 * Get relative time (e.g., "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  try {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Relative time error:', error);
    return '';
  }
};

/**
 * Check if task is overdue
 * @param {string|Date} deadline - Task deadline
 * @param {string} status - Task status
 * @returns {boolean} - True if overdue
 */
export const isTaskOverdue = (deadline, status) => {
  if (!deadline || status === 'Completed') return false;
  try {
    const parsedDate = typeof deadline === 'string' ? parseISO(deadline) : deadline;
    return isPast(parsedDate);
  } catch (error) {
    console.error('Overdue check error:', error);
    return false;
  }
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters' };
  }
  return { isValid: true, message: 'Password is valid' };
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  if (!name) return '?';
  const names = name.trim().split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Get priority badge color class
 * @param {string} priority - Task priority
 * @returns {string} - Tailwind CSS classes
 */
export const getPriorityColor = (priority) => {
  const colors = {
    High: 'bg-red-100 text-red-800 border-red-200',
    Medium: 'bg-orange-100 text-orange-800 border-orange-200',
    Low: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  return colors[priority] || colors.Medium;
};

/**
 * Get status badge color class
 * @param {string} status - Task status
 * @returns {string} - Tailwind CSS classes
 */
export const getStatusColor = (status) => {
  const colors = {
    Completed: 'bg-green-100 text-green-800 border-green-200',
    Incomplete: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };
  return colors[status] || colors.Incomplete;
};

/**
 * Filter tasks by search query
 * @param {Array} tasks - Array of tasks
 * @param {string} query - Search query
 * @returns {Array} - Filtered tasks
 */
export const filterTasksBySearch = (tasks, query) => {
  if (!query || !query.trim()) return tasks;
  const lowerQuery = query.toLowerCase().trim();
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowerQuery) ||
    task.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Sort tasks by date
 * @param {Array} tasks - Array of tasks
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} - Sorted tasks
 */
export const sortTasksByDate = (tasks, order = 'desc') => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};