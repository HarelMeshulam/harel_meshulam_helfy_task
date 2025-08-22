const express = require('express');
const router = express.Router();
const { findTaskById, validateTask } = require('../middleware/taskMiddleware');

const tasks = [
  {
    id: 1,
    title: 'Review Harel Meshulam candidate resume',
    description: 'Applied for Fullstack Junior Engineer position',
    completed: true,
    createdAt: new Date().toISOString(),
    priority: 'high'
  },
  {
    id: 2,
    title: 'Call candidate for home assignment',
    description: 'Make sure he got the assignment',
    completed: true,
    createdAt: new Date().toISOString(),
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Review candidate home assignment',
    description: 'Test the implementation of the home assignment',
    completed: false,
    createdAt: new Date().toISOString(),
    priority: 'low'
  }
];
let idCounter = 4;

const taskById = findTaskById(tasks);

router.get('/', (req, res) => {
  res.status(200).json(tasks); 
});

router.post('/', validateTask, (req, res) => {
  const { title, description = '', priority = 'medium' } = req.body;
  
  const newTask = {
    id: idCounter++,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    priority: ['low', 'medium', 'high'].includes(priority) ? priority : 'medium'
  };
  
  tasks.push(newTask);
  
  res.status(201).json(newTask);
});

router.put('/:id', taskById, validateTask, (req, res) => {
  const { title, description, completed, priority } = req.body;
  const taskIndex = req.taskIndex;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    priority: priority && ['low', 'medium', 'high'].includes(priority) ? priority : tasks[taskIndex].priority
  };
  
  res.status(200).json(tasks[taskIndex]);
});

router.delete('/:id', taskById, (req, res) => {
  const taskIndex = req.taskIndex;
  
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.status(200).json(deletedTask);
});

router.patch('/:id/toggle', taskById, (req, res) => {
  const taskIndex = req.taskIndex;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    completed: !tasks[taskIndex].completed
  };
  
  res.status(200).json(tasks[taskIndex]);
});

module.exports = router;