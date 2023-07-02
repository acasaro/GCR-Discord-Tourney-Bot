// at the top of your file
const { EmbedBuilder, userMention } = require('discord.js');
const { logError } = require('../common/utility-logging');
const { logo, footer } = require('../common/constants/embeds');

module.exports = {
  async PostEmbed(props) {
    const { tournament, organizer, joinUrl } = props;
    const {
      description,
      game_mode,
      lobby_channel_id,
      organizer_id,
      timestamp,
      title,
    } = tournament;

    try {
      // inside a command, event listener, etc.

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: organizer.username,
          iconURL: organizer.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`\n${title}`)
        .setDescription(description)
        .addFields(
          {
            name: '\u200B',
            value: `TYPE: **${game_mode}** \nWHEN: **${timestamp}** \nWHERE: **<#${lobby_channel_id}>**`,
          },

          {
            name: '\u200B',
            value: `[_**Join Tournament Channel**_](${joinUrl})`,
          },
        )

        .setTimestamp()
        .setThumbnail(logo)
        .setFooter(footer);
      return {
        embeds: [exampleEmbed],
        // allowed_mentions: {
        //   replied_user: false,
        //   parse: [],
        //   roles: [],
        // },
      };
    } catch (error) {
      logError(error);
    }
  },
};
