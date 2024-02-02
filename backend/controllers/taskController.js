const { task, user, group } = require("../models");

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
      const oneTask = await task.findByPk(taskId);
      if (!oneTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(oneTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTask: async (req, res) => {
    const { group_id, user_id, title, description, urgency, isComplete } =
      req.body;

    try {
      const newTask = await task.create({
        group_id,
        user_id,
        title,
        description,
        urgency,
        isComplete,
      });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTask: async (req, res) => {
    const taskId = req.params.id;
    const { group_id, user_id, title, description, urgency, isComplete } =
      req.body;

    try {
      const taskUpd = await task.findByPk(taskId);
      if (!taskUpd) {
        return res.status(404).json({ message: "Task not found" });
      }

      await taskUpd.update({
        group_id,
        user_id,
        title,
        description,
        urgency,
        isComplete,
      });

      const groupCompletionUpd = await group.findByPk(group_id, {
        include: [{ model: task}],
      });

      // If the group is found, update the completion attribute
      if (groupCompletionUpd) {
        const totalTasks = groupCompletionUpd.tasks.length;
        const completedTasks = groupCompletionUpd.tasks.filter((t) => t.isComplete).length;
        const completionPercentage = (completedTasks / totalTasks) * 100 || 0;

        // Update the 'completion' attribute of the group
        await groupCompletionUpd.update({ completion: completionPercentage });
      }

      res.json(taskUpd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTask: async (req, res) => {
    const taskId = req.params.id;

    try {
      const taskDel = await task.findByPk(taskId);
      if (!taskDel) {
        return res.status(404).json({ message: "Task not found" });
      }

      await taskDel.destroy();
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
