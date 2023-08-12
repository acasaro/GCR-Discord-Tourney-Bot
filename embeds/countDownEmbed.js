const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');
const { CheckinEmbedMessage } = require('./checkinEmbed');
const { AdminEmbed } = require('./adminEmbed-alt');
const { updateTournament } = require('../common/utility-functions');
const dayjs = require('dayjs');

const CountdownEmbedMessage = async ({
  interaction,
  tournamentCheckinChannel,
  adminMessage,
  tournament,
  checkinMessage,
  ...props
}) => {
  // const { admin_message_id, checkin_channel_id } = tournament;
  const countdownDurationMinutes = 5;
  const endTime = dayjs().add(countdownDurationMinutes, 'minute');

  try {
    const embed = new EmbedBuilder()
      .setTitle(`⏱️ Time remaining: ${countdownDurationMinutes} minutes`)
      // .setDescription(`Check-in Timer`)
      .setColor(0xfd3d3d);

    const sentMessage = await tournamentCheckinChannel.send({
      embeds: [embed],
    });

    await interaction.reply({
      content: `Check-in has now started \n\nParticipants will click the "Check-in" button in #tournament-lobby channel to confirm they're here and ready to play! Those who do not will not be in the tournament when the Admin clicks the "End" button.`,
      components: [row({ disableButtons: false })],
    });

    const interval = setInterval(async () => {
      const currentTime = dayjs();
      const remainingTime = endTime.diff(currentTime, 'second');

      // countdownDuration -= 1;

      if (remainingTime <= 0) {
        clearInterval(interval);

        const updatedCheckinMessage = await checkinMessage.edit(
          CheckinEmbedMessage({ checkinActive: false }),
        );

        const updatedAdminMessage = await AdminEmbed({
          tournament: {
            ...tournament.dataValues,
            checkin_active: false,
          },
        });
        await adminMessage.edit(updatedAdminMessage);

        await updateTournament(tournament.id, {
          checkin_message_id: updatedCheckinMessage.id.toString(),
          checkin_active: false,
        });
        await sentMessage.delete();
        await interaction.editReply({
          content: 'Check-in has ended',
          embeds: [],
          components: [],
        });
      } else {
        const remainingMinutes = Math.floor(remainingTime / 60);
        const remainingSeconds = remainingTime % 60;
        embed.setTitle(
          `⏱️ Time remaining: ${remainingMinutes}m ${remainingSeconds}s`,
        );
        sentMessage.edit({ embeds: [embed] });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CountdownEmbedMessage,
};

// Components
// ----------------------------------------------------------------------

const endButton = ({ disableButtons = false }) => {
  return new ButtonBuilder()
    .setCustomId('end_checkin')
    .setLabel('End')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(disableButtons);
};
const cancelButton = ({ disableButtons = false }) => {
  return new ButtonBuilder()
    .setCustomId('cancel_checkin')
    .setLabel('Cancel')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(disableButtons);
};
const row = props => {
  return new ActionRowBuilder().addComponents(
    endButton({ ...props }),
    cancelButton({ ...props }),
  );
};
