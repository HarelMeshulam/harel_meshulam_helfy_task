const API_URL = 'http://localhost:4000/api';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  
  return response.json();
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  return response.json();
};

export const toggleTaskCompletion = async (id) => {
  const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle task completion');
  }
  
  return response.json();
};