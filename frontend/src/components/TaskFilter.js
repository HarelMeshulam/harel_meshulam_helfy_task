import React from 'react';

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div>
      <button
        onClick={() => onFilterChange('all')}
        disabled={activeFilter === 'all'}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        disabled={activeFilter === 'completed'}
      >
        Completed
      </button>
      <button
        onClick={() => onFilterChange('pending')}
        disabled={activeFilter === 'pending'}
      >
        Pending
      </button>
    </div>
  );
}

export default TaskFilter;