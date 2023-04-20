const express = require('express');
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTaskById);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTaskById);

router.delete('/tasks/:id', deleteTaskById);

module.exports = router;
