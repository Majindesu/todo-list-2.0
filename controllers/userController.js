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
      const user = await user.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
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
      console.log('Deleting user with ID:', userId);
  
      const delUser = await user.findByPk(userId);
      console.log('User found:', delUser);
  
      if (!delUser) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      await delUser.destroy();
      console.log('User deleted successfully');
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  },
};
