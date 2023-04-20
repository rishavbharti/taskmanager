const tasks = require('../model/tasks');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getAllTasks = async (req, res) => {
  try {
    const allTasks = tasks.find();
    res.status(201).send(allTasks);
  } catch (error) {
    console.error('error ', error.message);
    res.status(400).json(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const body = req.body;
    const result = tasks.write(body);
    res.status(200).send(result);
  } catch (error) {
    console.error('error ', error.message);
    res.status(400).json(error.message);
  }
};

module.exports = { getAllTasks, createTask };
