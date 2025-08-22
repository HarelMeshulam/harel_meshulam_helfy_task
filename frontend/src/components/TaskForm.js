import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
    }
  }, [task]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...(task && { id: task.id }),
      title,
      description,
      priority
    });
    
    setTitle('');
    setDescription('');
    setPriority('medium');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      
      <div>
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <button type="submit">{task ? 'Update' : 'Add'} Task</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default TaskForm;