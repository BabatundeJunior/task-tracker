const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const controller = require('../controllers/tasks');
const verifyToken = require('../middleware/verifyToken');

// GET all tasks
router.get('/', controller.getAllTasks);

// GET single task
router.get('/:id', controller.getSingleTask);

// POST new task
router.post(
  '/',
  verifyToken,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').isIn(['pending', 'in-progress', 'done']).withMessage('Invalid status'),
    body('dueDate').isISO8601().withMessage('Due date must be a valid date')
  ],
  controller.createTask
);

// PUT update task
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title').notEmpty().withMessage('Title is required'),
    body('status').isIn(['pending', 'in-progress', 'done']).withMessage('Invalid status'),
    body('dueDate').isISO8601().withMessage('Due date must be a valid date')
  ],
  controller.updateTask
);

// DELETE task
router.delete(
  '/:id',
  verifyToken,
  [param('id').isMongoId().withMessage('Invalid task ID')],
  controller.deleteTask
);

module.exports = router;
