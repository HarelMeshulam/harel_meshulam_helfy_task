const findTaskById = (tasks) => (req, res, next) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      message: `Task with ID ${taskId} not found`
    });
  }
  
  req.taskIndex = taskIndex;
  req.task = tasks[taskIndex];
  next();
};

const validateTask = (req, res, next) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      message: 'Title is required'
    });
  }
  
  next();
};

module.exports = {
  findTaskById,
  validateTask
};