const db = require('../../backend/db/models');
const { Tournament } = db;
const { ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
  id: 'start_tourney_checkin',
  async execute(interaction) {
    try {
      // Get tournament from DB
      const tournament = await Tournament.findOne({
        where: {
          admin_channel_id: interaction.channelId,
        },
      });
      const { lobby_channel_id } = tournament.dataValues;

      // Fetch tournament lobby channel
      const tournamentLobbyChannel =
        interaction.client.channels.cache.get(lobby_channel_id);

      // Send checkin message to chat inside tournament lobby.
      await require('../../embeds/checkinEmbed').execute(
        tournamentLobbyChannel,
      );

      await interaction.reply({
        content: `Check-in has now started \n\nParticipants will click the "Check-in" button in #tournament-lobby channel to confirm they're here and ready to play! Those who do not will not be in the tournament when the Admin clicks the "End" button.`,
        components: [row({ disableButtons: false })],
      });
    } catch (error) {
      await interaction.reply({
        constent: `Something went wrong \n Error: ${JSON.stringify(error)}`,
      });
    }
  },
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
