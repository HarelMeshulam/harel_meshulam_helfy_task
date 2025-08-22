import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div>No tasks found. Add your first task!</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;