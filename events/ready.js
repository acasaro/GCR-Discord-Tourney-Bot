const db = require('../backend/db');

const { Events } = require('discord.js');
// const db = require('../backend/db/models');
const { logSuccess, logError, logdb } = require('../common/utility-logging');
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await db.authenticate();
      logdb('Connected to SQLite database successfully.');
    } catch (error) {
      logError('Unable to connect to the database:', error);
    }
    logSuccess(`Ready! Logged in as ${client.user.tag}`);
  },
};
