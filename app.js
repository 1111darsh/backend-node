const express = require('express');
const app = express();

let tasks = [
    { id: 1, title: 'Task 1', description: 'This is task 1', done: false },
    { id: 2, title: 'Task 2', description: 'This is task 2', done: false }
];

app.use(express.json());

// GET - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// GET - Retrieve a specific task
app.get('/tasks/:task_id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.task_id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ task });
});

// POST - Create a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title: req.body.title,
        description: req.body.description || '',
        done: false
    };
    tasks.push(newTask);
    res.status(201).json({ task: newTask });
});

// PUT - Update an existing task
app.put('/tasks/:task_id', (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.task_id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...req.body
    };
    res.json({ task: tasks[taskIndex] });
});

// PATCH - Partially update an existing task
app.patch('/tasks/:task_id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.task_id));
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    Object.keys(req.body).forEach(key => {
        if (key in task) {
            task[key] = req.body[key];
        }
    });
    res.json({ task });
});

// DELETE - Delete an existing task
app.delete('/tasks/:task_id', (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.task_id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.json({ result: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
