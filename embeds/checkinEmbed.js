const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { footer, logo } = require('../common/constants/embeds');

module.exports = {
  id: 'checkin_embed',
  async execute(tournamentLobbyChannel) {
    try {
      const checkinEmbedMessage = new EmbedBuilder()
        .setTitle(`Tournament Check-in`)
        .setColor(0x00b9ff)
        .setDescription(
          `Please click on the check-in button below to confirm your participation in the tournament. \n 
          Otherwise you will not be matched to a team once check-in has ended!`,
        )
        .setThumbnail(logo)
        .setFooter(footer);

      await tournamentLobbyChannel.send({
        content: `@here`,
        embeds: [checkinEmbedMessage],
        components: [row],
      });
    } catch (error) {
      console.log(error);
    }
  },
};

// Components
// ----------------------------------------------------------------------

const checkinButton = () => {
  return (
    new ButtonBuilder()
      .setStyle(ButtonStyle.Success)
      // .setEmoji("🏆")
      .setLabel(`Check-in`)
      .setCustomId('checkin_user')
  );
};

const row = new ActionRowBuilder().addComponents(checkinButton());
