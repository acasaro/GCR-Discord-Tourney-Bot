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
        ? `@everyone Please click on the check-in button below to confirm your participation in the tournament. \n 
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

  const checkoutButton = () => {
    return new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel(`Check-out`)
      .setCustomId('checkout_user');
  };

  const row = new ActionRowBuilder().addComponents(
    checkinButton(),
    checkoutButton(),
  );

  return {
    // content: ``,
    embeds: [checkinEmbed],
    components: [row],
    allowed_mentions: {
      replied_user: false,
      parse: ['everyone'],
      roles: ['everyone'],
    },
  };
};

module.exports = {
  CheckinEmbedMessage,
};
