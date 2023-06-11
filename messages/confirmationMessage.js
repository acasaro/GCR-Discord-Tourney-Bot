const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  async execute(interaction) {
    const response = await interaction.reply({
      content:
        "Are you sure you want to delete the tournament channels, category, and role? This cannot be undone.",
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmationResponse = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 600_000,
      });

      if (confirmationResponse.customId === "delete_tournament") {
        // DELETE TOURNAMENT LOGIC HERE
      } else if (confirmationResponse.customId === "cancel_button") {
        await interaction.editReply({
          content: `Delete was cancelled `,
          components: [],
        });
      }
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: `Something is wrong. Please try again.\nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
        embeds: [],
      });
    }
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
