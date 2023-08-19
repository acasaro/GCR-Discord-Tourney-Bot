const { Events } = require('discord.js');
const deployCommands = require('../deploy-commands');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {
    try {
      console.log(`Joined a new guild: ${guild.name}`);
      deployCommands(guild.id);
    } catch (error) {
      console.log(error);
    }
  },
};
