import express from 'express';
import { checkAuth } from './middleware/auth.js';
import { getAllTasks, createTask, getTaskbyId, updateTask, deleteTask } from './tasks.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use("/tasks", checkAuth); // Use auth middleware for all /tasks routes

// GET All Tasks
app.get('/tasks', (req, res) => {
    const tasks = getAllTasks();
    res.json(tasks);
});

// GET Task by ID
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = getTaskbyId(id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// POST Create Task
app.post('/tasks', (req, res) => {
    const { title, deadline } = req.body;
    if (!title || !deadline) {
        return res.status(400).json({ message: 'Title and deadline are required' });
    }
    const task = createTask(title, deadline);
    res.status(201).json(task);
});

// PUT Update Task
app.put('/tasks/:id', (req, res) => {
    const task = updateTask(parseInt(req.params.id), req.body);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// DELETE Task
app.delete('/tasks/:id', (req, res) => {
    const task = deleteTask(parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
