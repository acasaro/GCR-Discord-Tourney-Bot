const { EmbedBuilder } = require('discord.js');
const { footer, logo } = require('../common/constants/embeds');
const { commands, channels } = require('../common/constants/discord');

const adminEmbed = tournamentVaulues => {
  const {
    title,
    description,
    organizer_id,
    startDate,
    publish_channel_id,
    lobby_channel_id,
    game_mode,
    status,
  } = tournamentVaulues;
  console.log('organizer ID:', organizer_id);
  return (
    new EmbedBuilder()
      .setTitle(`GCR Tournament Configuration `)
      .setColor(0x00b9ff)
      // .setDescription(``)
      .setThumbnail(logo)
      .setFooter(footer)
      .addFields({
        name: '\u200B',
        value: `📝 Name: ${title} \n 📝 Details: ${description} \n 📝 Game Mode: ${game_mode} \n 📆 Start Date: ${startDate} \n Organizer:<@${organizer_id}>`,
      })
      .addFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: '**BUTTONS**',
          value: `🏁 Starts the tournament \n ✅ Starts the check in feature\n 📣 Posts tourney to <#${channels.tourney_bot_test}> - </move:${commands.move}> \n ⛔ Un-publish: Un-publishes the entry portal \n ✏️ Edits tournament details \n 🗑️ Deletes the tournament `,
        },
      )
  );
};
module.exports = {
  adminEmbed,
};
