import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTasks, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';
import Modal from '../components/Modal';
import { SkeletonLoader } from '../components/Loader';
import { ANIMATION_VARIANTS } from '../utils/constants';

/**
 * Dashboard Page Component
 * Main task management interface
 */
const Dashboard = () => {
  const { user } = useAuth();
  const { tasks, loading } = useTasks();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Get task statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    incomplete: tasks.filter(t => t.status === 'Incomplete').length,
    overdue: tasks.filter(t => t.isOverdue && t.status === 'Incomplete').length
  };

  // Handle create new task
  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  // Stats cards data
  const statsCards = [
    {
      icon: FaTasks,
      label: 'Total Tasks',
      value: stats.total,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: FaCheckCircle,
      label: 'Completed',
      value: stats.completed,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: FaClock,
      label: 'Incomplete',
      value: stats.incomplete,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      icon: FaExclamationCircle,
      label: 'Overdue',
      value: stats.overdue,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.fadeInDown}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="text-gradient">{user?.name}!</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what you need to do today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="text-3xl text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateTask}
            className="btn-primary flex items-center gap-2 shine"
          >
            <FaPlus />
            Create New Task
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="mb-6"
        >
          <TaskFilter />
        </motion.div>

        {/* Tasks Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {loading ? (
            <SkeletonLoader />
          ) : tasks.length === 0 ? (
            <motion.div
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="glass rounded-2xl p-12 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <FaTasks className="text-6xl text-gray-300" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first task!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateTask}
                className="btn-primary"
              >
                <FaPlus className="inline mr-2" />
                Create Your First Task
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEditTask}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Empty State for Filtered Results */}
        {!loading && tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-8"
          >
            <p className="text-gray-500">
              Try adjusting your filters to see more tasks
            </p>
          </motion.div>
        )}
      </div>

      {/* Task Create/Edit Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        size="medium"
      >
        <TaskForm
          task={editingTask}
          onClose={handleCloseModal}
          onSuccess={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;