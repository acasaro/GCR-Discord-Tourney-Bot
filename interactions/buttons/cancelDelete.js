module.exports = {
  id: 'cancel_delete_tournament',
  async execute(interaction) {
    await interaction.deferUpdate();
    return;
  },
};
