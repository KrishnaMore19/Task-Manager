import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as taskService from '../services/taskService';
import { TOAST_MESSAGES } from '../utils/constants';
import { useAuth } from './AuthContext';

// Create Task Context
const TaskContext = createContext();

// Custom hook to use Task Context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Task Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    search: ''
  });
  const { isAuthenticated } = useAuth();

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated, filters]);

  /**
   * Fetch all tasks with filters
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks(filters);
      
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new task
   * @param {Object} taskData - Task data
   */
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await taskService.createTask(taskData);
      
      if (response.success) {
        setTasks(prevTasks => [response.data, ...prevTasks]);
        toast.success(TOAST_MESSAGES.TASK_CREATED);
        return response.data;
      }
    } catch (error) {
      console.error('Create task error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing task
   * @param {string} taskId - Task ID
   * @param {Object} taskData - Updated task data
   */
  const updateTask = async (taskId, taskData) => {
    try {
      setLoading(true);
      const response = await taskService.updateTask(taskId, taskData);
      
      if (response.success) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === taskId ? response.data : task
          )
        );
        toast.success(TOAST_MESSAGES.TASK_UPDATED);
        return response.data;
      }
    } catch (error) {
      console.error('Update task error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete task
   * @param {string} taskId - Task ID
   */
  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await taskService.deleteTask(taskId);
      
      if (response.success) {
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
        toast.success(TOAST_MESSAGES.TASK_DELETED);
      }
    } catch (error) {
      console.error('Delete task error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle task status (Complete/Incomplete)
   * @param {string} taskId - Task ID
   * @param {string} currentStatus - Current task status
   */
  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const response = await taskService.toggleTaskStatus(taskId, currentStatus);
      
      if (response.success) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === taskId ? response.data : task
          )
        );
        
        if (response.data.status === 'Completed') {
          toast.success(TOAST_MESSAGES.TASK_COMPLETED);
        }
        
        return response.data;
      }
    } catch (error) {
      console.error('Toggle task status error:', error);
      toast.error(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      throw error;
    }
  };

  /**
   * Update filters
   * @param {Object} newFilters - New filter values
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Reset filters
   */
  const resetFilters = () => {
    setFilters({
      status: 'All',
      priority: 'All',
      search: ''
    });
  };

  /**
   * Get task statistics
   */
  const getStats = () => {
    return taskService.getTaskStats(tasks);
  };

  /**
   * Refresh tasks
   */
  const refreshTasks = () => {
    fetchTasks();
  };

  // Context value
  const value = {
    tasks,
    loading,
    filters,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    updateFilters,
    resetFilters,
    refreshTasks,
    getStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};