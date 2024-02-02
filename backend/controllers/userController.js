const { user } = require('../models');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await user.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
      const oneUser = await user.findByPk(userId);
      if (!oneUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(oneUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;

    try {
      const newUser = await user.create({
        username,
        password,
        firstName,
        lastName,
        email,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.id;
    const { username, password, firstName, lastName, email } = req.body;

    try {
      const userUpd = await user.findByPk(userId);
      if (!userUpd) {
        return res.status(404).json({ message: 'User not found' });
      }

      await userUpd.update({
        username,
        password,
        firstName,
        lastName,
        email,
      });

      res.json(userUpd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;

    try {
      const delUser = await user.findByPk(userId);
      if (!delUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      await delUser.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
