const { Group, User } = require('../models');

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
      const group = await group.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createGroup: async (req, res) => {
    const { user_id, title, description, completion } = req.body;

    try {
      const group = await group.create({
        user_id,
        title,
        description,
        completion,
      });
      res.status(201).json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateGroup: async (req, res) => {
    const groupId = req.params.id;
    const { user_id, title, description, completion } = req.body;

    try {
      const group = await group.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      await group.update({
        user_id,
        title,
        description,
        completion,
      });

      res.json(group);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteGroup: async (req, res) => {
    const groupId = req.params.id;

    try {
      const group = await group.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      await group.destroy();
      res.json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
