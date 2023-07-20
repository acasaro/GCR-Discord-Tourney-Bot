const {
  checkIfExists,
  getTournamentByCategoryId,
} = require('../../common/utility-functions');

module.exports = {
  id: 'checkin_user',
  async execute(interaction) {
    const { channel, member } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    try {
      const isRegistered = await checkIfExists(
        tournament.id,
        member.user.id.toString(),
      );

      if (isRegistered) {
        await interaction.reply({
          content: `You're already checked-in to this tournament`,
          ephemeral: true,
        });
      } else {
        await require('../../select-menus/RankSelect').execute(interaction);
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
