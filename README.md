### Installation

1. Clone the repository:
```
git clone git@github.com:HarelMeshulam/harel_meshulam_helfy_task.git
cd harel_meshulam_helfy_task
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Install frontend dependencies:
```
cd ../frontend
npm install
```

## Running the Application

### Backend
```
cd backend
npm start
```
The server will run on port 4000 (http://localhost:4000).

### Frontend
```
cd frontend
npm start
```
The React application will run on port 3000 (http://localhost:3000).

Make sure to run both frontend and backend simultaneously for the application to work properly.

## API Documentation

The API provides the following endpoints:

### GET /api/tasks
- **Description**: Retrieves all tasks
- **Response**: Array of task objects

### POST /api/tasks
- **Description**: Creates a new task
- **Body**:
  - title (required): string
  - description (optional): string
  - priority (optional): "low" | "medium" | "high"
- **Response**: Created task object

### PUT /api/tasks/:id
- **Description**: Updates an existing task
- **Parameters**: id - Task ID
- **Body**: Any task properties to update
- **Response**: Updated task object

### DELETE /api/tasks/:id
- **Description**: Deletes a task
- **Parameters**: id - Task ID
- **Response**: Deleted task object

### PATCH /api/tasks/:id/toggle
- **Description**: Toggles the completion status of a task
- **Parameters**: id - Task ID
- **Response**: Updated task object

## Time Breakdown

- **Backend Development**: ~80 minutes

- **Frontend Development And Styling**: ~140 minutes

