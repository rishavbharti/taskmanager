const express = require('express');
const { getAllTasks, getTaskById, createTask } = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTaskById);

router.post('/tasks', createTask);

module.exports = router;
