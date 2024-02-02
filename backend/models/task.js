'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      task.belongsTo(models.user, {
        as: 'userTask',
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      task.belongsTo(models.group, {
        as: 'taskGroup',
        foreignKey: 'group_id',
        onDelete: 'CASCADE'
      });
    }
  }
  task.init({
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    urgency: DataTypes.STRING,
    isComplete: {type: DataTypes.BOOLEAN, defaultValue:false}
  }, {
    sequelize,
    modelName: 'task',
  });

  task.afterUpdate(async (task, options) => {
    const Group = sequelize.models.group;
    const group = await Group.findByPk(task.group_id);

    if (group) {
      // Calculate and update the 'completion' attribute
      const totalTasks = group.tasks.length;
      const completedTasks = group.tasks.filter(t => t.isComplete).length;
      const completionPercentage = (completedTasks / totalTasks) * 100 || 0;

      // Update the 'completion' attribute of the group
      await group.update({ completion: completionPercentage }, options.transaction);
    }
  });

  return task;
};