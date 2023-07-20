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
      invited_roles,
      lobby_channel_id,
      organizer_id,
      timestamp,
      title,
    } = tournament;

    try {
      // inside a command, event listener, etc.

      const message = `🏆  __**${title}**__  🏆 \n\n${description} \n\n**TYPE:** ${game_mode} \n**WHEN:** ${timestamp}\n**WHERE:** ${joinUrl}\n\n**WHO:** ${
        invited_roles ? invited_roles : '@everyone'
      } \n\n See you all there! \n \u200B`;

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setAuthor({
          name: organizer.username,
          iconURL: organizer.displayAvatarURL({ dynamic: true }),
        })
        .setTitle(`\n${title}`)
        .setDescription(description)
        .addFields({
          name: '\u200B',
          value: ` \n \u200B`,
        })

        .setTimestamp()
        .setThumbnail(logo)
        .setFooter(footer);
      return {
        content: message,
        // embeds: [exampleEmbed],
        allowed_mentions: {
          replied_user: false,
          parse: ['everyone'],
          roles: ['everyone'],
        },
      };
    } catch (error) {
      logError(error);
    }
  },
};
