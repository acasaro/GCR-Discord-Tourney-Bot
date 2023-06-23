const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { footer, logo } = require('../common/constants/embeds');

const CheckinEmbedMessage = ({ checkinActive, ...props }) => {
  const checkinEmbed = new EmbedBuilder()
    .setTitle(checkinActive ? `Tournament Check-in` : `Check-in Has Ended`)
    .setColor(0x00b9ff)
    .setDescription(
      checkinActive
        ? `Please click on the check-in button below to confirm your participation in the tournament. \n 
    Otherwise you will not be matched to a team once check-in has ended!`
        : `The Check-in period has been ended by the tournament admin. Teams will be made shortly. `,
    )
    .setThumbnail(logo)
    .setFooter(footer);

  const checkinButton = () => {
    return new ButtonBuilder()
      .setStyle(checkinActive ? ButtonStyle.Success : ButtonStyle.Secondary)
      .setEmoji(checkinActive ? `✔️` : `🚫`)
      .setLabel(`Check-in`)
      .setCustomId('checkin_user')
      .setDisabled(!checkinActive);
  };

  const row = new ActionRowBuilder().addComponents(checkinButton());

  return {
    // content: ``,
    embeds: [checkinEmbed],
    components: [row],
  };
};

module.exports = {
  CheckinEmbedMessage,
};
