const express = require('express');
const { getAllTasks, createTask } = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getAllTasks);

router.post('/tasks', createTask);

module.exports = router;
