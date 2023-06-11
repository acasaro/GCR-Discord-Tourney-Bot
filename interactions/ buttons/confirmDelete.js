module.exports = {
  id: "confirm_delete",
  async execute(interaction) {
    await require("../../messages/confirmationMessage").execute(interaction);

    //   await interaction.reply({
    //     content:
    //       "",
    //   });
    return;
  },
};
