// Attempted to programmatically migrate database. Terrible idea -- might revisit

// // index.js
// const { Sequelize } = require('sequelize');
// const { Umzug, SequelizeStorage } = require('umzug');
// const config = require('../backend/config/database.js')['development']
// const path = require('path')

// const sequelize = new Sequelize({ ...config, database: config.database, username: config.username, password: config.password });

// console.log(config)
// console.log(process.cwd())
// const umzug = new Umzug({
//     migrations: { glob: process.cwd() + '/backend/db/migrations/*.js' },
//     context: sequelize.getQueryInterface(),
//     storage: new SequelizeStorage({ sequelize }),
//     logger: console,
// });

// (async () => {
//     // Checks migrations and run them if they are not already applied. To keep
//     // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
//     // will be automatically created (if it doesn't exist already) and parsed.
//     await umzug.up();
// })();