const { Events } = require("discord.js");
const db = require("../backend/db/models");
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await db.sequelize.authenticate();
      console.log("Connected to SQLite database successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
