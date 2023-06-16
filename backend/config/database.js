const path = require("path")
// Want to get your opinion on this:
// I'm specifying the path to the .env in root dir 
require("dotenv").config({ path: path.join(__dirname, '../../.env') })

// import config to get path to db 
const { config } = require("../../config.js")

// Not too sure about this:
// Adjusts the path to database relative to /backend 
let dbPath = process.cwd().includes('backend') ? '../' + config.DB_FILE : config.DB_FILE


module.exports = {
  development: {
    storage: dbPath,
    dialect: "sqlite",
    seederStorage: "sequelize",
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    // logging: false
  },
};

