/**
 * @file editTournamentInfo
 * @type Modal Interaction
 * @description
 */
const db = require('../../backend/db/models');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const { Tournament } = db;

module.exports = {
  id: 'edit_tournament_modal',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    // Get modal input fields
    const tournamentName =
      interaction.fields.getTextInputValue('tournament_name');
    const tournamentInfo =
      interaction.fields.getTextInputValue('tournament_info');

    // Get tournament from DB
    const tournament = await Tournament.findOne({
      where: {
        admin_channel_id: interaction.channelId,
      },
    });

    // Merge tournament values with new modal values
    const { admin_message_id } = tournament.dataValues;
    const updatedTournamentValues = {
      ...tournament.dataValues,
      title: tournamentName,
      description: tournamentInfo,
    };

    // Update tournament in DB
    await Tournament.update(
      { title: tournamentName, description: tournamentInfo },
      {
        where: {
          id: tournament.id,
        },
      },
    );

    // Edit Admin message with updated values
    const adminMessage = await interaction.channel.messages.fetch(
      admin_message_id,
    );

    const updatedAdminMessage = await AdminEmbed({
      tournament: {
        ...updatedTournamentValues,
      },
    });

    await adminMessage.edit(updatedAdminMessage);

    await interaction.deferUpdate();
    return;
  },
};
