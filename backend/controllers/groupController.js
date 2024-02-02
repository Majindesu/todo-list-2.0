const { group, user } = require('../models');

function calculateGroupCompletion(group) {
    const totalTasks = group.tasks.length;
    const completedTasks = group.tasks.filter(task => task.isComplete).length;
    const completionPercentage = (completedTasks / totalTasks) * 100 || 0;
    return completionPercentage;
}

module.exports = {
  getAllGroups: async (req, res) => {
    try {
      const groups = await group.findAll();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getGroupById: async (req, res) => {
    const groupId = req.params.id;

    try {
      const oneGroup = await group.findByPk(groupId);
      if (!oneGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.json(oneGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGroup: async (req, res) => {
    const { user_id, title, description, completion } = req.body;

    try {
      const newGroup = await group.create({
        user_id,
        title,
        description,
        completion,
      });
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateGroup: async (req, res) => {
    const groupId = req.params.id;
    const { user_id, title, description, completion } = req.body;

    try {
      const groupUpd = await group.findByPk(groupId);
      if (!groupUpd) {
        return res.status(404).json({ message: 'Group not found' });
      }

      await groupUpd.update({
        user_id,
        title,
        description,
        completion,
      });

      res.json(groupUpd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteGroup: async (req, res) => {
    const groupId = req.params.id;

    try {
      const groupDel = await group.findByPk(groupId);
      if (!groupDel) {
        return res.status(404).json({ message: 'Group not found' });
      }

      await groupDel.destroy();
      res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
