// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getAllTasks = async (req, res) => {
  try {
    return res.status(201).send('All tasks');
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

module.exports = { getAllTasks };
