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

// @desc    Get task by id
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;

    const task = tasks.findById(id);
    if (!task.length) throw new Error("Couldn't find a task with the given id");
    res.status(201).send(task);
  } catch (error) {
    console.error('error ', error.message);
    res.status(400).json(error.message);
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

module.exports = { getAllTasks, getTaskById, createTask };
