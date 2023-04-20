const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
} = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTaskById);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTaskById);

module.exports = router;
