const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const controller = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');


// GET all users
router.get('/', controller.getAllUsers);

// GET single user
router.get('/:id', [param('id').isMongoId().withMessage('Invalid user ID')], controller.getSingleUser);

// POST new user
router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').notEmpty().withMessage('Role is required')
  ],
  controller.createUser
);

// PUT update user
router.put(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('role').notEmpty().withMessage('Role is required')
  ],
  controller.updateUser
);


router.delete(
  '/:id',
  verifyToken,
  [
    param('id').isMongoId().withMessage('Invalid user ID')
  ],
  controller.deleteUser
);

module.exports = router;
