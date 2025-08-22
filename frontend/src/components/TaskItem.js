import React from 'react';

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const { id, title, description, completed, createdAt, priority } = task;
  
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        <span>Priority: {priority}</span>
        <span>Status: {completed ? 'Completed' : 'Pending'}</span>
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div>
        <button onClick={() => onToggleComplete(id)}>
          {completed ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;