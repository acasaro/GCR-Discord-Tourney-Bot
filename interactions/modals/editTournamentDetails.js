const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const {
  getTournamentByCategoryId,
  updateTournament,
  updateCategoryChannelName,
} = require('../../common/utility-functions');

module.exports = {
  id: 'edit_tournament_modal',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    const { guild, channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    // Get modal input fields
    const tournamentName =
      interaction.fields.getTextInputValue('tournament_name');
    const tournamentInfo =
      interaction.fields.getTextInputValue('tournament_info');

    // Merge tournament values with new modal values
    const { admin_message_id } = tournament;

    const updatedTournamentValues = {
      ...tournament,
      title: tournamentName,
      description: tournamentInfo,
    };

    // Get Category Channel
    const categoryChannel =
      guild.channels.cache.get(parentChannelId) ||
      (await guild.channels.fetch(parentChannelId));

    // Get Lobby Channel
    const lobbyChannel =
      guild.channels.cache.get(tournament.lobby_channel_id) ||
      (await guild.channels.fetch(tournament.lobby_channel_id));

    // Check if name has changed
    if (categoryChannel.name !== tournamentName) {
      await updateCategoryChannelName(categoryChannel, tournamentName);
    }
    if (lobbyChannel.name !== `${tournamentName} Stage`) {
      await updateCategoryChannelName(lobbyChannel, `${tournamentName} Stage`);
    }

    // Update tournament in DB
    await updateTournament(tournament.id, {
      title: tournamentName,
      description: tournamentInfo,
    });

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
