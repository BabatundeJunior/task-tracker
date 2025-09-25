const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const getAllTasks = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('tasks').find();
    const tasks = await result.toArray();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getSingleTask = async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('tasks').find({ _id: taskId });
    const tasks = await result.toArray();

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(tasks[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate
  };

  try {
    const result = await mongodb.getDb().collection('tasks').insertOne(task);

    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create task' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const taskId = new ObjectId(req.params.id);
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    dueDate: req.body.dueDate
  };

  try {
    const result = await mongodb.getDb().collection('tasks').replaceOne({ _id: taskId }, task);

    if (result.modifiedCount === 1) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Task not found or unchanged' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const taskId = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDb().collection('tasks').deleteOne({ _id: taskId });

    if (result.deletedCount === 1) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
};
