/**
 * @file New Tournament Message
 * @type Embed
 * @description
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { createEmbed } = require("../embeds/createEmbed");

module.exports = {
  async execute(interaction) {
    return await interaction.reply({
      embeds: [createEmbed],
      components: [row],
      ephemeral: false,
    });
  },
};

// Message Components
// ----------------------------------------------------------------------

const cancel = () =>
  new ButtonBuilder()
    .setCustomId("cancel_tournament")
    .setEmoji("❌")
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Secondary);

const create = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setEmoji("🏆")
    .setLabel(`Create`)
    .setCustomId("create_tourney");
};

const publish = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("📣")
    .setLabel(`Post`)
    .setCustomId("post_tourney");
};

const unpublish = (isDisabled) => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("⛔")
    .setLabel(`Unpost`)
    .setCustomId("unpost_tourney")
    .setDisabled(isDisabled || false);
};

const editDetails = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("✏️")
    .setLabel(`Edit`)
    .setCustomId("edit_details");
};

const row = new ActionRowBuilder().addComponents(
  create(),
  editDetails(),
  publish(),
  unpublish(true),
  cancel()
);
