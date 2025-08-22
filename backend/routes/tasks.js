const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const tasks = [];

const findTaskById = (req, res, next) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Task with ID ${taskId} not found`
    });
  }
  
  req.taskIndex = taskIndex;
  req.task = tasks[taskIndex];
  next();
};

const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }
  
  next();
};

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: tasks
  });
});

router.post('/', validateTask, (req, res) => {
  const { title, description = '' } = req.body;
  
  const newTask = {
    id: uuidv4(),
    title,
    description,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask
  });
});

router.put('/:id', findTaskById, validateTask, (req, res) => {
  const { title, description, status } = req.body;
  const taskIndex = req.taskIndex;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updated_at: new Date().toISOString()
  };
  
  res.status(200).json({
    success: true,
    data: tasks[taskIndex]
  });
});

router.delete('/:id', findTaskById, (req, res) => {
  const taskIndex = req.taskIndex;
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.status(200).json({
    success: true,
    data: deletedTask,
    message: 'Task deleted successfully'
  });
});

router.patch('/:id/toggle', findTaskById, (req, res) => {
  const taskIndex = req.taskIndex;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    status: tasks[taskIndex].status === 'pending' ? 'completed' : 'pending',
    updated_at: new Date().toISOString()
  };
  
  res.status(200).json({
    success: true,
    data: tasks[taskIndex]
  });
});

module.exports = router;