const tasks = require('../model/tasks');

// @desc    Get tasks
// @route   GET /api/tasks, /api/tasks?priority=high&completed=true
// @param   ?property=value
// @body    { sortBy: property, orderBy: 'asc' | 'desc' }
// @access  Public
const getTasks = async (req, res) => {
  try {
    const { body: sortArgs, query: queryParams } = req;

    const filteredTasks = tasks.find(queryParams, sortArgs);
    res.status(200).send(filteredTasks);
  } catch (error) {
    console.error('error ', error);
    res.status(400).json(error.message);
  }
};

// @desc    Get task by id
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;

    const task = tasks.findById(id);
    if (!task) throw new Error("Couldn't find a task with the given id");
    res.status(200).send(task);
  } catch (error) {
    console.error('error ', error);
    res.status(400).json(error.message);
  }
};

// @desc    Get tasks by priority
// @route   GET /api/tasks/priority/:level
// @access  Public
const getTasksByPriority = async (req, res) => {
  try {
    const { level } = req.params;

    const filteredTasks = tasks.find({
      priority: level,
    });
    if (!filteredTasks.length)
      throw new Error("Couldn't find a task with the given priority");
    res.status(200).send(filteredTasks);
  } catch (error) {
    console.error('error ', error);
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
    res.status(201).send(result);
  } catch (error) {
    console.error('error ', error);
    res.status(400).json(error.message);
  }
};

// @desc    Update task by id
// @route   PUT /api/tasks/:id
// @access  Public
const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const task = tasks.findByIdAndUpdate(id, body);
    res.status(200).send(task);
  } catch (error) {
    console.error('error ', error);
    res.status(400).json(error.message);
  }
};

// @desc    Delete a task by id
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = tasks.deleteOne({ id });
    if (result) res.status(200).send('Deleted task');
  } catch (error) {
    console.error('error ', error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  getTasksByPriority,
  createTask,
  updateTaskById,
  deleteTaskById,
};
