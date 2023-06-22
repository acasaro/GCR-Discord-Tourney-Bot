const {
  getTournamentByCategoryId,
  registerTournamentUser,
  getUserRankedRole,
} = require('../../common/utility-functions');

module.exports = {
  id: 'checkin_user',
  async execute(interaction) {
    try {
      const { member, channel } = interaction;

      // Get tournament checkin belongs to
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const userRankedRole = await getUserRankedRole(member);

      if (!userRankedRole) {
        return await interaction.reply({
          content:
            'You must assign yourself a ranked role before checking into a tournament',
          ephemeral: true,
        });
      } else {
        const newRegistration = {
          tournament_id: tournament.id,
          username: member.user.username,
          discord_id: member.user.id.toString(),
          discord_rank_role_id: userRankedRole.id.toString(),
          discord_rank_role_name: userRankedRole.name,
        };
        // Add User to Registrations Table
        const checkinResponse = await registerTournamentUser(newRegistration);

        return await interaction.reply({
          content: checkinResponse,
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.reply({
        content: 'There was an issue checking you into this tournament',
        ephemeral: true,
      });
      console.log(error);
    }
    return;
  },
};
