/**
 * @file Create
 * @type Slash Cmd
 * @description Creates initial setup for new tournament
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "create",
  description: "Create a tournament",
  guildOnly: true,
  data: new SlashCommandBuilder().setName("create").setDescription("Create a tournament"),
  async execute(interaction) {
    const response = await require("../../messages/createTourneyMessage").execute(interaction);

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
