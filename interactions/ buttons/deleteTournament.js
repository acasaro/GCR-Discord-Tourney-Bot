module.exports = {
  id: "delete_tournament",
  async execute(interaction) {
    await interaction.reply({
      content: "Deleting tournament...",
    });
    return;
  },
};
