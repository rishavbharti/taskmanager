const express = require('express');
const { getAllTasks } = require('../controller/tasks');
const router = express.Router();

router.get('/tasks', getAllTasks);

module.exports = router;
