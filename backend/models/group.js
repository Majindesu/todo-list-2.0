'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      group.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        as: 'groupUser'
      });
      group.hasMany(models.task, {
        foreignKey: 'group_id',
      })
    }
  }
  group.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};