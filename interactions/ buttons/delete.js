module.exports = {
  id: "delete_tournament",
  async execute(interaction) {
    await require("../../messages/confirmationMessage").execute(interaction);

    //   await interaction.reply({
    //     content:
    //       "",
    //   });
    return;
  },
};
