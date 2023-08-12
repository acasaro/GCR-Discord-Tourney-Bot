const {
  checkIfExists,
  getTournamentByCategoryId,
  deleteRegisteredTournamentUser,
} = require('../../common/utility-functions');

module.exports = {
  id: 'checkout_user',
  async execute(interaction) {
    const { channel, member } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    try {
      const isRegistered = await checkIfExists(
        tournament.id,
        member.user.id.toString(),
      );
      let content = `You've been checked-out of tournament`;
      if (!isRegistered) {
        content = `You are not currently checked-in to tournament`;
      } else {
        await deleteRegisteredTournamentUser(
          tournament.id,
          member.user.id.toString(),
        );
      }
      await interaction.reply({
        content,
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content: 'There was an issue please try again',
        ephemeral: true,
      });
      console.log(error);
    }
    return;
  },
};
