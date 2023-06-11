require("dotenv").config();

const config = {
  token: "Discord Application Token",
  clientId: "Discord applications client id",
  guildId: "Your development server's id",
  // guild: "SERVER ID",
  // liveEventStageId: "Live Event Channel ID",
  // HUBtxtChannelID: "leaveBlank",
  // HUBvcChannelID: "HUB CHANNEL ID",
  // DefaultRoleID: "if use @everyone, just put the server id in here. ",
  // categoryID: "CATEGORY",
  // status: "",
  // enable_slash: true,
  // prefix: "]",
  // owners: [""],
};
//use env
config.token = process.env.TOKEN;
config.clientId = process.env.CLIENT_ID;
config.guildId = process.env.GUILD_ID;
config.liveEventStageId = process.env.SERVER_ID;
config.guild = process.env.SERVER_ID;
config.HUBvcChannelID = process.env.HUB_ID;
config.DefaultRoleID = process.env.ROLE_ID;
config.categoryID = process.env.CATEGORY_ID;
config.prefix = process.env.PREFIX;
config.owners = process.env.OWNERS
  ? process.env.OWNERS.split(",")
  : null || [""];

module.exports = { config };
