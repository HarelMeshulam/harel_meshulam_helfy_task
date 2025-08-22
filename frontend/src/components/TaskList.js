import { useState, useRef, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onToggleComplete, onEdit, onDelete, activeFilter }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  
  // Reset currentIndex when tasks array changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [tasks.length]);

  // Handle out of bounds currentIndex
  useEffect(() => {
    if (tasks.length > 0 && currentIndex >= tasks.length) {
      setCurrentIndex(tasks.length - 1);
    }
  }, [tasks, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (tasks.length === 0) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextTask();
      } else if (e.key === 'ArrowLeft') {
        prevTask();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tasks.length, isTransitioning]);

  // Empty state messages based on filter
  if (tasks.length === 0) {
    if (activeFilter === 'completed') {
      return <div className="empty-tasks">No completed tasks found. Mark some tasks as completed to see them here.</div>;
    } else if (activeFilter === 'pending') {
      return <div className="empty-tasks">No pending tasks found. All your tasks are completed.</div>;
    } else {
      return <div className="empty-tasks">No tasks found. Add your first task.</div>;
    }
  }

  const nextTask = () => {
    if (isTransitioning || tasks.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tasks.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); 
  };

  const prevTask = () => {
    // If there are no more than 1 task or the carousel is already animating between tasks
    if (isTransitioning || tasks.length <= 1) return;
    
    setIsTransitioning(true);

    // Cycle moving
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tasks.length) % tasks.length);
    

    // Mark the transition as complete after 300ms
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleDelete = (id) => {
    // Find the position of the task being deleted
    const deletedIndex = tasks.findIndex(task => task.id === id);
    // Call the actual delete function from props
    onDelete(id);
    // Special handling for last item deletion
    if (deletedIndex === tasks.length - 1 && deletedIndex > 0) {
      setCurrentIndex(deletedIndex - 1);
    }
  };

  const renderCarouselItems = () => {
    // If 0 tasks
    if (tasks.length === 0) {
      if (activeFilter === 'completed') {
        return <div className="empty-tasks">No completed tasks found.</div>;
      } else if (activeFilter === 'pending') {
        return <div className="empty-tasks">No pending tasks found.</div>;
      } else {
        return <div className="empty-tasks">No tasks found.</div>;
      }
    }
    
    // If only one task
    if (tasks.length === 1) {
      return (
        <div className="carousel-item active">
          <TaskItem
            task={tasks[0]}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      );
    }

    const validIndex = Math.min(currentIndex, tasks.length - 1);
    
    // Out of bounds situation
    if (validIndex !== currentIndex) {
      setCurrentIndex(validIndex);
      return null;
    }
    
    const prevIndex = (validIndex - 1 + tasks.length) % tasks.length;
    const nextIndex = (validIndex + 1) % tasks.length;

    return (
      <>
        <div className="carousel-item previous" key={`prev-${tasks[prevIndex].id}`}>
          <TaskItem
            task={tasks[prevIndex]}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
        
        <div className="carousel-item active" key={`current-${tasks[validIndex].id}`}>
          <TaskItem
            task={tasks[validIndex]}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
        
        <div className="carousel-item next" key={`next-${tasks[nextIndex].id}`}>
          <TaskItem
            task={tasks[nextIndex]}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      </>
    );
  };

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      
      <div 
        className="carousel-container" 
        ref={carouselRef}
      >
        <button 
          className="carousel-control prev"
          onClick={prevTask} 
          disabled={tasks.length <= 1}
        >
          &#8249;
        </button>
        
        <div className={`carousel-viewport ${isTransitioning ? 'transitioning' : ''}`}>
          {renderCarouselItems()}
          
          <div className="carousel-indicators">
            {tasks.map((_, index) => (
              <span 
                key={index} 
                className={index === currentIndex ? 'active' : ''}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 300);
                  }
                }}
              >
                •
              </span>
            ))}
          </div>
        </div>
        
        <button 
          className="carousel-control next"
          onClick={nextTask} 
          disabled={tasks.length <= 1}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default TaskList;