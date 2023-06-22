const {
  getTournamentByCategoryId,
  getRegisteredUsers,
} = require('../../common/utility-functions');

module.exports = {
  id: 'start_tourney',
  async execute(interaction) {
    const { channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const players = await getRegisteredUsers(tournament.id);
    console.log(players);
    await interaction.deferUpdate();

    // await interaction.reply({
    //   content: `⌛ Generating teams & starting tournament... 🏎`,
    //   components: [],
    //   embeds: [],
    //   ephemeral: true,
    // });

    return;
  },
};
