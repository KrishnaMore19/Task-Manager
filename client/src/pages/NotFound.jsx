import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaSearch } from 'react-icons/fa';
import { ANIMATION_VARIANTS } from '../utils/constants';

/**
 * NotFound Page Component
 * 404 error page with animations
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="relative text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInDown}
          className="mb-8"
        >
          <motion.h1
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-9xl md:text-[200px] font-bold text-gradient leading-none"
          >
            404
          </motion.h1>
        </motion.div>

        {/* Animated Search Icon */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <FaSearch className="text-6xl text-gray-300 mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-xl text-gray-600 mb-8 max-w-md mx-auto"
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            Go Back
          </motion.button>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <FaHome />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute w-4 h-4 bg-primary-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;