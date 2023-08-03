const fs = require('fs');
const { Sequelize } = require('sequelize');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// Define the models directory path
const modelsDir = path.join(__dirname, 'models');

// Read the contents of the models directory
const modelFiles = fs.readdirSync(modelsDir);
// Initialize each model and associate them if needed
modelFiles.forEach(file => {
  const modelPath = path.join(modelsDir, file);
  const model = require(modelPath);
  if (typeof model === 'function') {
    model(sequelize, Sequelize.DataTypes);
  }
});

module.exports = sequelize;
