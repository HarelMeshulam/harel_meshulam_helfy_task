import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTasks(tasks);
    } else if (activeFilter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.completed));
    } else {
      setFilteredTasks(tasks.filter(task => !task.completed));
    }
  }, [tasks, activeFilter]);

  const handleSubmitTask = async (taskData) => {
    try {
      let response;
      
      if (editingTask) {
        response = await fetch(`http://localhost:4000/api/tasks/${taskData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
      } else {
        response = await fetch('http://localhost:4000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const savedTask = await response.json();
      
      if (editingTask) {
        setTasks(tasks.map(task => task.id === savedTask.id ? savedTask : task));
      } else {
        setTasks([...tasks, savedTask]);
      }
      
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to toggle task status');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Task Manager</h1>
      
      <TaskFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <TaskForm
        task={editingTask}
        onSubmit={handleSubmitTask}
        onCancel={editingTask ? handleCancelEdit : null}
      />
      
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;