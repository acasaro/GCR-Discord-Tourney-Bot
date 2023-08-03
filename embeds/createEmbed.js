const { EmbedBuilder } = require('discord.js');
const { footer, logo } = require('../common/constants/embeds');
const { commands, channels } = require('../common/constants/discord');

const createEmbed = new EmbedBuilder()
  .setTitle(`Welcome to Tournament Bot!`)
  .setColor(0x00b9ff)
  .setThumbnail(logo)
  .setFooter(footer)
  .addFields({
    name: '**CONFIGURATION**',
    value:
      '📝 Name: New Tournament \n 📝 Details: None specified \n 📝 Game Mode: None specified \n 📆 Start Date: None specified ',
  })
  .addFields(
    { name: '\u200B', value: '\u200B' },
    {
      name: '**BUTTONS**',
      value: `🏆 Creates category and channels for tourney\n ✏️ Edits tournament details\n 📣 Post tourney and entry portal to <#${channels.tourney_bot_test}> - </move:${commands.move}> \n ⛔ Un-posts tourney and entry portal \n ❌ Cancels tournament setup `,
    },
  );

module.exports = {
  createEmbed,
};
