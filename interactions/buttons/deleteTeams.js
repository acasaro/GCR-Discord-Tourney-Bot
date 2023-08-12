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
    const { teams_channel_id, teams_created_message_id, lobby_channel_id } =
      tournament;

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

    // Get the channel where you want to lookup the message
    const tournamentStageChannel = guild.channels.cache.get(lobby_channel_id);

    if (!tournamentStageChannel) {
      await interaction.reply(
        'Tournament stage not found, (it may have been deleted).',
      );
      return;
    }
    // Fetch the specific checkin message by its ID
    const teamsCreatedMessage = await tournamentStageChannel.messages.fetch(
      teams_created_message_id,
    );

    await teamsCreatedMessage.delete();

    // Update Tournament with teams_channel_id
    await updateTournament(tournament.id, {
      teams_channel_id: null,
      teams_created_message_id: null,
    });

    // Delete team manager embed message
    await interaction.message.delete();
    return await interaction.deferUpdate();
  },
};
