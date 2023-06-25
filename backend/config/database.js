require('dotenv').config({ path: '../.env' });
const path = require('path');
const { logdb } = require('../../common/utility-logging');

// configurations for db
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'database_development',
    host: '127.0.0.1',
    storage: path.resolve(__dirname, '../database.sqlite'),
    dialect: 'sqlite',
    seederStorage: 'sequelize',
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    logging: msg => logdb(msg),
  },
};
