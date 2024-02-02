const { Task, User, Group } = require('../models');

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await task.findAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTaskById: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    const { group_id, user_id, title, description, urgency, isComplete } = req.body;

    try {
      const task = await task.create({
        group_id,
        user_id,
        title,
        description,
        urgency,
        isComplete,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTask: async (req, res) => {
    const taskId = req.params.id;
    const { group_id, user_id, title, description, urgency, isComplete } = req.body;

    try {
      const task = await task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await task.update({
        group_id,
        user_id,
        title,
        description,
        urgency,
        isComplete,
      });

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      const task = await task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await task.destroy();
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
