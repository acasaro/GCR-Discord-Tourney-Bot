require("dotenv").config({ path: "../.env" });

// configurations for db
module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "database_development",
    host: "127.0.0.1",
    storage: "./backend/database.sqlite",
    dialect: "sqlite",
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    logging: true,
  },
};
