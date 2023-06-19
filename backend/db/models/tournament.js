'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tournament.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    organizer_id: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    publish_location_id: DataTypes.INTEGER,
    admin_channel_id: DataTypes.INTEGER,
    parent_channel_id: DataTypes.INTEGER,
    game_mode: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};