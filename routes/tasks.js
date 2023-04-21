const express = require('express');
const {
  getTasks,
  getTaskById,
  getTasksByPriority,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getTasks);

router.get('/tasks/:id', getTaskById);

router.get('/tasks/priority/:level', getTasksByPriority);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTaskById);

router.delete('/tasks/:id', deleteTaskById);

module.exports = router;
