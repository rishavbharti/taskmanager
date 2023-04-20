const Database = require('.././db');

const taskSchema = {
  title: {
    type: 'String',
    trim: true,
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  description: {
    type: 'String',
    trim: true,
    minLength: 3,
    maxLength: 1000,
    required: true,
  },
  completed: {
    type: 'Boolean',
    default: false,
  },
  priority: {
    type: 'String',
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
};

module.exports = new Database().model('Tasks', taskSchema);
