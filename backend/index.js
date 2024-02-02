const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const groupController = require('./controllers/groupController');
const taskController = require('./controllers/taskController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User Routes`
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Group Routes
app.get('/groups', groupController.getAllGroups);
app.get('/groups/:id', groupController.getGroupById);
app.post('/groups', groupController.createGroup);
app.put('/groups/:id', groupController.updateGroup);
app.delete('/groups/:id', groupController.deleteGroup);

// Task Routes
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.post('/tasks', taskController.createTask);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
