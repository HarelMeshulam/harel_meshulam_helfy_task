import '../styles/TaskFilter.css';

function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      <button
        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </button>
    </div>
  );
}

export default TaskFilter;