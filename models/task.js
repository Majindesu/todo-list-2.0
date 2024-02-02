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
    isComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};