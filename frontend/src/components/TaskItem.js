import '../styles/TaskItem.css';

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const { id, title, description, completed, createdAt, priority } = task;
  
  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString();
  
  // Get priority class for styling
  const getPriorityClass = () => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{title}</h3>
        <span className={`task-priority ${getPriorityClass()}`}>
          {priority}
        </span>
      </div>
      
      <div className="task-description">
        {description || <em>No description</em>}
      </div>
      
      <div className="task-metadata">
        <span className="task-date">Created: {formattedDate}</span>
        <span className="task-status">
          Status: {completed ? 'Completed' : 'Pending'}
        </span>
      </div>
      
      <div className="task-actions">
        <button 
          className={`toggle-btn ${completed ? 'completed' : 'pending'}`}
          onClick={() => onToggleComplete(id)}
        >
          {completed ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        
        <button 
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        
        <button 
          className="delete-btn"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;