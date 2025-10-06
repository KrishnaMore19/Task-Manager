import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { formatDate, isTaskOverdue, truncateText, getPriorityColor, getStatusColor } from '../utils/helpers';
import { useTasks } from '../context/TaskContext';
import { ConfirmModal } from './Modal';

/**
 * TaskCard Component
 * Individual task card with animations and actions
 */
const TaskCard = ({ task, onEdit, index = 0 }) => {
  const { deleteTask, toggleTaskStatus } = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOverdue = isTaskOverdue(task.deadline, task.status);
  const isCompleted = task.status === 'Completed';

  // Handle task deletion
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task._id);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle status toggle
  const handleToggleStatus = async () => {
    try {
      await toggleTaskStatus(task._id, task.status);
    } catch (error) {
      console.error('Toggle status error:', error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={`glass rounded-xl p-6 card-hover ${isCompleted ? 'opacity-75' : ''}`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`text-xl font-bold text-gray-800 mb-2 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <p className={`text-gray-600 text-sm ${isCompleted ? 'line-through' : ''}`}>
              {truncateText(task.description, 100)}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Status Badge */}
          <span className={`badge ${getStatusColor(task.status)}`}>
            {task.status}
          </span>

          {/* Priority Badge */}
          <span className={`badge ${getPriorityColor(task.priority)}`}>
            {task.priority} Priority
          </span>

          {/* Overdue Badge */}
          {isOverdue && (
            <span className="badge bg-red-100 text-red-800 border-red-200 animate-pulse">
              <FaExclamationCircle className="inline mr-1" />
              Overdue
            </span>
          )}
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <FaClock className={isOverdue ? 'text-red-500' : 'text-gray-400'} />
          <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
            Due: {formatDate(task.deadline)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          {/* Complete/Uncomplete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleStatus}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              isCompleted
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            <FaCheck />
            {isCompleted ? 'Uncomplete' : 'Complete'}
          </motion.button>

          {/* Edit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)}
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            aria-label="Edit task"
          >
            <FaEdit />
          </motion.button>

          {/* Delete Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            aria-label="Delete task"
            disabled={isDeleting}
          >
            <FaTrash />
          </motion.button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default TaskCard;