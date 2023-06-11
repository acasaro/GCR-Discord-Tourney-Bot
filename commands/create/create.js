const Discord = require("discord.js");
const { SlashCommandBuilder, ActionRowBuilder, PermissionsBitField, ChannelType } = Discord;
const { createEmbed } = require("../../embeds/createEmbed");
const { adminEmbed } = require("../../embeds/adminEmbed");

const {
  start,
  cancel,
  publish,
  unpublish,
  startCheckin,
  deleteTournament,
  editDetails,
  create,
} = require("./createComponents");
const { config } = require("../../config");

module.exports = {
  name: "create",
  description: "Create a tournament",
  guildOnly: true,
  data: new SlashCommandBuilder().setName("create").setDescription("Create a tournament"),
  async execute(interaction) {
    const tourneyPrompt = await CreateControlsMessage({ isEphemeral: true });
    const response = await interaction.reply(tourneyPrompt);

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 600_000,
      });

      if (confirmation.customId === "create_tourney") {
      } else if (confirmation.customId === "delete_tournament") {
      } else if (confirmation.customId === "cancel_tournament") {
        await interaction.deleteReply();
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

// Extended Functionality
// ----------------------------------------------------------------------

async function CreateControlsMessage({ isEphemeral = false }) {
  const row = new ActionRowBuilder().addComponents(
    create(),
    editDetails(),
    publish(),
    unpublish(true),
    cancel()
  );

  return {
    embeds: [createEmbed],
    components: [row],
    ephemeral: isEphemeral,
  };
}
