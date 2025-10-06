import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loader Component
 * Beautiful animated loading spinner
 */
const Loader = ({ size = 'medium', message = '' }) => {
  // Size variants
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated spinner */}
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </motion.div>

      {/* Optional loading message */}
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

/**
 * Full Page Loader
 * Covers entire screen with loading animation
 */
export const FullPageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-2xl"
      >
        <Loader size="large" />
        <p className="text-xl font-semibold text-gray-700">{message}</p>
      </motion.div>
    </div>
  );
};

/**
 * Skeleton Loader for Cards
 * Placeholder animation while content loads
 */
export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white rounded-xl p-6 shadow-lg">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;