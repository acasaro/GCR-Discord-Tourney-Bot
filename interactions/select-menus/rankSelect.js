const { ranks } = require('../../common/constants/tournaments');
const {
  getTournamentByCategoryId,
  updateTournament,
  registerTournamentUser,
} = require('../../common/utility-functions');

const timeoutDuration = 5000;

module.exports = {
  id: 'rank_select',
  async execute(interaction) {
    await interaction.deferUpdate();

    const { client, channel, member } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    try {
      const selectedRank = interaction?.values[0];
      const userRank = ranks.filter(
        rank => rank.value === parseInt(selectedRank),
      );
      if (userRank.length > 0) {
        // Update Database
        const newRegistration = {
          tournament_id: tournament.id,
          username: member.user.username,
          discord_id: member.user.id.toString(),
          rank_role_name: userRank[0].name,
          rank_value: parseInt(userRank[0].value),
          emoji_id: userRank[0].emoji,
          status: 'checked-in',
        };
        console.log(newRegistration);

        // Add User to Registrations Table
        const checkinResponse = await registerTournamentUser(newRegistration);
        await interaction.editReply({
          content: checkinResponse,
          components: [],
        });

        // Alert Admin Channel of Checkin
        const emoji = client.emojis.cache.get(userRank[0].emoji);
        // await interaction.editReply({
        //   content: `Successfully checked-in to tournament \nas ${emoji} ${userRank[0].name}`,
        //   components: [],
        // });
      }
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue checking you in. \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
      });
      console.log(error);
    }
  },
};
