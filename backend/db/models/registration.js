'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Registration.init(
    {
      tournament_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
      discord_id: DataTypes.STRING,
      rank_role_name: DataTypes.STRING,
      rank_value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Registration',
    },
  );
  return Registration;
};
