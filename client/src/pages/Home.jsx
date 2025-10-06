import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTasks, FaCheckCircle, FaClock, FaChartLine, FaRocket, FaShieldAlt, FaArrowRight, FaUserCircle, FaListAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { ANIMATION_VARIANTS } from '../utils/constants';

/**
 * Home Page Component
 * Landing page with storytelling animations
 * Shows different content for authenticated vs non-authenticated users
 */
const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: FaTasks,
      title: 'Easy Task Management',
      description: 'Create, organize, and manage your tasks with an intuitive interface designed for productivity.'
    },
    {
      icon: FaCheckCircle,
      title: 'Track Progress',
      description: 'Mark tasks as complete and watch your productivity soar with visual progress indicators.'
    },
    {
      icon: FaClock,
      title: 'Deadline Reminders',
      description: 'Never miss a deadline with smart reminders and overdue task notifications.'
    },
    {
      icon: FaChartLine,
      title: 'Priority Management',
      description: 'Set priorities and focus on what matters most with our intelligent task sorting.'
    },
    {
      icon: FaRocket,
      title: 'Fast & Responsive',
      description: 'Lightning-fast performance with beautiful animations that make task management enjoyable.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. Only you have access to your tasks and information.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 md:py-32">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
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
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"
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
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ANIMATION_VARIANTS.staggerContainer}
              className="text-center lg:text-left"
            >
              {isAuthenticated ? (
                // Content for authenticated users
                <>
                  <motion.div
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4"
                  >
                    <FaUserCircle />
                    <span className="font-semibold">Welcome back, {user?.name || 'User'}!</span>
                  </motion.div>

                  <motion.h1
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                  >
                    Ready to Tackle
                    <span className="text-gradient block mt-2">Your Tasks?</span>
                  </motion.h1>

                  <motion.p
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
                  >
                    Your personalized task dashboard is waiting. Stay organized and get things done.
                  </motion.p>

                  <motion.div
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Link to="/dashboard">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shine flex items-center justify-center gap-2"
                      >
                        <FaListAlt />
                        Go to Dashboard
                      </motion.button>
                    </Link>

                    <Link to="/profile">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-outline text-lg px-8 py-4 w-full sm:w-auto flex items-center justify-center gap-2"
                      >
                        <FaUserCircle />
                        View Profile
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.div
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="mt-8 grid grid-cols-3 gap-4 max-w-md"
                  >
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">24/7</div>
                      <div className="text-sm text-gray-600">Available</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-secondary-600 mb-1">∞</div>
                      <div className="text-sm text-gray-600">Tasks</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">100%</div>
                      <div className="text-sm text-gray-600">Secure</div>
                    </div>
                  </motion.div>
                </>
              ) : (
                // Content for non-authenticated users
                <>
                  <motion.h1
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                  >
                    Organize Your Life with
                    <span className="text-gradient block mt-2">TaskFlow</span>
                  </motion.h1>

                  <motion.p
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
                  >
                    The beautiful task manager that helps you stay focused, organized, and productive every day.
                  </motion.p>

                  <motion.div
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Link to="/signup">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-lg px-8 py-4 w-full sm:w-auto shine flex items-center justify-center gap-2"
                      >
                        Get Started Free
                        <FaArrowRight />
                      </motion.button>
                    </Link>

                    <Link to="/login">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-outline text-lg px-8 py-4 w-full sm:w-auto"
                      >
                        Sign In
                      </motion.button>
                    </Link>
                  </motion.div>

                  <motion.p
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    className="text-sm text-gray-500 mt-4"
                  >
                    No credit card required • Free forever • Get started in 30 seconds
                  </motion.p>
                </>
              )}
            </motion.div>

            {/* Right Content - Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="glass rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-4">
                    {[1, 2, 3].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.2 }}
                        className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-4"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                          className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-white text-xl"
                        >
                          <FaCheckCircle />
                        </motion.div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="text-gradient"> Stay Productive</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you accomplish more with less effort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={ANIMATION_VARIANTS.fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl p-8 card-hover"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white text-3xl mb-6"
                >
                  <feature.icon />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Organized?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already managing their tasks better with TaskFlow.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-10 py-4 rounded-lg text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3"
              >
                Start Free Today
                <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Home;