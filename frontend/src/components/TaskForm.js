import { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  
  useEffect(() => {
    if (task) { // If a task is provided for editing
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
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
  };
  
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>
      
      <div className="form-group">
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
      
      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {task ? 'Update' : 'Add'} Task
        </button>
        {onCancel && (
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;