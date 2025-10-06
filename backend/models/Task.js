const mongoose = require('mongoose');

/**
 * Task Schema
 * Stores task information linked to users
 */
const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' // Reference to User model
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a task description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status: {
      type: String,
      enum: ['Incomplete', 'Completed'],
      default: 'Incomplete'
    },
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline']
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    isOverdue: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

/**
 * Index for faster queries
 * Compound index on user and status for filtering tasks
 */
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, deadline: 1 });

/**
 * Virtual to check if task is overdue
 * This runs before each query
 */
taskSchema.pre('save', function (next) {
  if (this.deadline < new Date() && this.status === 'Incomplete') {
    this.isOverdue = true;
  } else {
    this.isOverdue = false;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);