module.exports = {
  id: 'checkin_user',
  async execute(interaction) {
    try {
      await require('../../select-menus/RankSelect').execute(interaction);
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
