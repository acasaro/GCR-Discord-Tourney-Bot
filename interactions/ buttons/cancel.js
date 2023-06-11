module.exports = {
  id: "cancel_tournament",
  async execute(interaction) {
    await interaction.reply({
      content: "Tournament setup cancelled",
      components: [],
      embeds: [],
      ephemeral: true,
    });
    return;
  },
};
