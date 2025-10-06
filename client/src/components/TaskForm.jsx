import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaTimes } from 'react-icons/fa';
import { useTasks } from '../context/TaskContext';
import { TASK_PRIORITY } from '../utils/constants';

/**
 * TaskForm Component
 * Form for creating and editing tasks
 */
const TaskForm = ({ task = null, onClose, onSuccess }) => {
  const { createTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium'
  });

  // Populate form if editing
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
        priority: task.priority || 'Medium'
      });
    }
  }, [task]);

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

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      }
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
      // Convert deadline to ISO string
      const taskData = {
        ...formData,
        deadline: new Date(formData.deadline).toISOString()
      };

      if (task) {
        // Update existing task
        await updateTask(task._id, taskData);
      } else {
        // Create new task
        await createTask(taskData);
      }

      // Reset form and close
      setFormData({
        title: '',
        description: '',
        deadline: '',
        priority: 'Medium'
      });

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={`input-field ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
          maxLength={100}
        />
        {errors.title && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.title}
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formData.title.length}/100 characters
        </p>
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows={4}
          className={`input-field resize-none ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
          maxLength={500}
        />
        {errors.description && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {errors.description}
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Deadline and Priority Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Deadline Input */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-semibold text-gray-700 mb-2">
            Deadline *
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={`input-field ${errors.deadline ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
          />
          {errors.deadline && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.deadline}
            </motion.p>
          )}
        </div>

        {/* Priority Select */}
        <div>
          <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field cursor-pointer"
          >
            <option value={TASK_PRIORITY.LOW}>Low</option>
            <option value={TASK_PRIORITY.MEDIUM}>Medium</option>
            <option value={TASK_PRIORITY.HIGH}>High</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {task ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <FaSave />
              {task ? 'Update Task' : 'Create Task'}
            </>
          )}
        </motion.button>

        {onClose && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FaTimes />
            Cancel
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

export default TaskForm;