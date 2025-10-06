import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useTasks } from '../context/TaskContext';
import { FILTER_OPTIONS } from '../utils/constants';
import { debounce } from '../utils/helpers';

/**
 * TaskFilter Component
 * Filter tasks by status, priority, and search
 */
const TaskFilter = () => {
  const { filters, updateFilters, resetFilters } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    updateFilters({ search: value });
  }, 300);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    updateFilters({ [filterType]: value });
  };

  // Handle reset filters
  const handleReset = () => {
    resetFilters();
    setSearchInput('');
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.status !== 'All' || 
    filters.priority !== 'All' || 
    filters.search !== '';

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search tasks by title..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all duration-300 bg-white/80"
          />
          {searchInput && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setSearchInput('');
                updateFilters({ search: '' });
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </motion.button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
            showFilters || hasActiveFilters
              ? 'bg-primary-500 text-white'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-500'
          }`}
        >
          <FaFilter />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          )}
        </motion.button>
      </div>

      {/* Filter Panel */}
      <motion.div
        initial={false}
        animate={{ 
          height: showFilters ? 'auto' : 0,
          opacity: showFilters ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="glass rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Filter Options</h3>
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Reset All
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.status.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('status', option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filters.status === option.value
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.priority.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterChange('priority', option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      filters.priority === option.value
                        ? 'bg-secondary-500 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-secondary-300'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.status !== 'All' && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    Status: {filters.status}
                  </span>
                )}
                {filters.priority !== 'All' && (
                  <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                    Priority: {filters.priority}
                  </span>
                )}
                {filters.search && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Search: "{filters.search}"
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TaskFilter;