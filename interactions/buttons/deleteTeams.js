const {
  getTournamentByCategoryId,
  deleteTournamentTeam,
  getTournamentTeams,
} = require('../../common/utility-functions');

module.exports = {
  id: 'remove_all_teams',
  async execute(interaction) {
    const { guild, channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

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
    await interaction.channel.delete();

    return await interaction.deferUpdate();
  },
};
