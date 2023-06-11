module.exports = {
  id: "delete_tournament",
  async execute(interaction) {
    await interaction.deferUpdate();
    return;
  },
};
