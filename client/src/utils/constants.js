// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Task Status
export const TASK_STATUS = {
  INCOMPLETE: 'Incomplete',
  COMPLETED: 'Completed',
  ALL: 'All'
};

// Task Priority
export const TASK_PRIORITY = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  ALL: 'All'
};

// Priority Colors
export const PRIORITY_COLORS = {
  Low: 'bg-blue-100 text-blue-800 border-blue-200',
  Medium: 'bg-orange-100 text-orange-800 border-orange-200',
  High: 'bg-red-100 text-red-800 border-red-200'
};

// Status Colors
export const STATUS_COLORS = {
  Completed: 'bg-green-100 text-green-800 border-green-200',
  Incomplete: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

// Filter Options
export const FILTER_OPTIONS = {
  status: [
    { value: 'All', label: 'All Tasks' },
    { value: 'Incomplete', label: 'Incomplete' },
    { value: 'Completed', label: 'Completed' }
  ],
  priority: [
    { value: 'All', label: 'All Priorities' },
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ]
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Toast Messages
export const TOAST_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Welcome back! 🎉',
  LOGOUT_SUCCESS: 'Logged out successfully! 👋',
  SIGNUP_SUCCESS: 'Account created successfully! 🎉',
  
  // Tasks
  TASK_CREATED: 'Task created successfully! ✅',
  TASK_UPDATED: 'Task updated successfully! ✏️',
  TASK_DELETED: 'Task deleted successfully! 🗑️',
  TASK_COMPLETED: 'Task marked as completed! 🎉',
  
  // Errors
  ERROR_GENERIC: 'Something went wrong! Please try again.',
  ERROR_NETWORK: 'Network error! Check your connection.',
  ERROR_AUTH: 'Authentication failed! Please login again.'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'taskManagerToken',
  USER: 'taskManagerUser',
  THEME: 'taskManagerTheme'
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PASSWORD: /^.{6,}$/ // At least 6 characters
};