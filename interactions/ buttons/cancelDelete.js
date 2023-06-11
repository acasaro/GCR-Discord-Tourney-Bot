module.exports = {
  id: "cancel_delete_tournament",
  async execute(interaction) {
    console.log(interaction);
    await interaction.deferUpdate();
    return;
  },
};
