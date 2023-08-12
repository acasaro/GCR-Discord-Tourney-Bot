const {
  getTournamentByCategoryId,
  deleteTournamentTeam,
  getTournamentTeams,
  updateTournament,
} = require('../../common/utility-functions');

module.exports = {
  id: 'remove_all_teams',
  async execute(interaction) {
    const { guild, channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const { teams_channel_id } = tournament;

    const teams = await getTournamentTeams(tournament.id);

    const teamsToDelete = [];
    const channelsToDelete = [];

    teams.forEach(team => {
      if (team.voice_channel_id) {
        const teamVC = guild.channels.cache.get(team.voice_channel_id);
        channelsToDelete.push(teamVC.delete());
      }
      teamsToDelete.push(deleteTournamentTeam(team.id));
    });

    await Promise.all([...teamsToDelete, ...channelsToDelete]);

    // Fetch Teams channel and delete it
    const teamsChannel =
      interaction.client.channels.cache.get(teams_channel_id);

    if (teamsChannel) {
      await teamsChannel.delete();
    }

    // Update Tournament with teams_channel_id
    await updateTournament(tournament.id, {
      teams_channel_id: null,
    });

    // Delete team manager embed message
    await interaction.message.delete();
    return await interaction.deferUpdate();
  },
};
