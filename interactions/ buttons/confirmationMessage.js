const { Message } = require("discord.js");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  id: "confirm_message",
  async execute(interaction) {
    // console.log(interaction);

    const response = await interaction.reply({
      content:
        "Are you sure you want to delete the tournament channels, category, and role? This cannot be undone.",
      components: [row({ disableButtons: false })],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmationResponse = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 600_000,
      });

      if (confirmationResponse.customId === "delete_tournament") {
        await interaction.editReply({
          content: `Deleting tournament... `,
          components: [],
        });
        // DELETE TOURNAMENT LOGIC HERE
      } else if (confirmationResponse.customId === "cancel_delete_tournament") {
        await interaction.editReply({
          content: `Delete was cancelled `,
          components: [row({ disableButtons: true })],
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

    return;
  },
};

// Components
// ----------------------------------------------------------------------

const cancelButton = ({ disableButtons = false }) => {
  return new ButtonBuilder()
    .setCustomId("cancel_delete_tournament")
    .setEmoji("✖")
    .setLabel("Cancel")
    .setStyle(disableButtons ? ButtonStyle.Secondary : ButtonStyle.Danger)
    .setDisabled(disableButtons);
};
const confirmButton = ({ disableButtons = false }) => {
  return new ButtonBuilder()
    .setCustomId("delete_tournament")
    .setEmoji("✔️")
    .setLabel("Confirm")
    .setStyle(disableButtons ? ButtonStyle.Secondary : ButtonStyle.Success)
    .setDisabled(disableButtons);
};
const row = (props) => {
  return new ActionRowBuilder().addComponents(
    confirmButton({ ...props }),
    cancelButton({ ...props })
  );
};
