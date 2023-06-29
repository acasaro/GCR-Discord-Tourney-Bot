const {
  getTournamentByCategoryId,
  deleteTournament,
} = require('../../common/utility-functions');

module.exports = {
  id: 'delete_tournament',
  async execute(interaction) {
    const { channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    await deleteTournament(tournament.id);

    const channelsToDelete = await interaction.client.channels.cache.filter(
      channel =>
        channel.id === parentChannelId || channel.parentId === parentChannelId,
    );
    channelsToDelete.forEach(channel => {
      channel.delete();
    });
    await interaction.deferUpdate();
    return;
  },
};
