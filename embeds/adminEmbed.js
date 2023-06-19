const { EmbedBuilder } = require('discord.js');
const { footer, logo } = require('../common/constants/embeds');
const { commands, channels } = require('../common/constants/discord');

const adminEmbed = new EmbedBuilder()
  .setTitle(`GCR Tournament Configuration `)
  .setColor(0x00b9ff)
  // .setDescription(``)
  .setThumbnail(logo)
  .setFooter(footer)
  .addFields({
    name: '\u200B',
    value:
      '📝 Name: New Tournament \n 📝 Details: None specified \n 📝 Game Mode: None specified \n 📆 Start Date: None specified',
  })
  .addFields(
    { name: '\u200B', value: '\u200B' },
    {
      name: '**BUTTONS**',
      value: `🏁 Starts the tournament \n ✅ Starts the check in feature\n 📣 Posts tourney to <#${channels.tourney_bot_test}> - </move:${commands.move}> \n ⛔ Un-publish: Un-publishes the entry portal \n ✏️ Edits tournament details \n 🗑️ Deletes the tournament `,
    },
  );

module.exports = {
  adminEmbed,
};
