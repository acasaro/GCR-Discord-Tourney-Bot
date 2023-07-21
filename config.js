require('dotenv').config();

const config = {
  token: 'Discord Application Token',
  clientId: 'Discord applications client id',
  guildId: "Your development server's id",
};
//use env
config.token = process.env.TOKEN;
config.clientId = process.env.CLIENT_ID;
config.guildId = process.env.TEST_GUILD_ID;
config.liveEventStageId = process.env.SERVER_ID;
config.guild = process.env.SERVER_ID;
config.HUBvcChannelID = process.env.HUB_ID;
config.DefaultRoleID = process.env.ROLE_ID;
config.categoryID = process.env.CATEGORY_ID;
config.prefix = process.env.PREFIX;
config.testGuildId = process.env.TEST_GUILD_ID;
config.owners = process.env.OWNERS
  ? process.env.OWNERS.split(',')
  : null || [''];

module.exports = { config };
