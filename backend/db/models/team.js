'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Team.init(
    {
      name: DataTypes.STRING,
      tournament_id: DataTypes.INTEGER,
      voice_channel_id: DataTypes.STRING,
      skill_level: DataTypes.INTEGER,
      players: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Team',
    },
  );
  return Team;
};
