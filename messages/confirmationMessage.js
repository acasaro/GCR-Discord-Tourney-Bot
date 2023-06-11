const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  async execute(interaction) {
    await interaction.reply({
      content:
        "Are you sure you want to delete the tournament channels, category, and role? This cannot be undone.",
      components: [row],
      ephemeral: true,
    });
    return;
  },
};

// Components
// ----------------------------------------------------------------------

const cancelButton = new ButtonBuilder()
  .setCustomId("cancel_button")
  .setEmoji("✖")
  .setLabel("Cancel")
  .setStyle(ButtonStyle.Danger);

const confirmButton = new ButtonBuilder()
  .setCustomId("confirm_button")
  .setEmoji("✔️")
  .setLabel("Confirm")
  .setStyle(ButtonStyle.Success);

const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton);
