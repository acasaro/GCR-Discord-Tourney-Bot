const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { adminEmbed } = require("../embeds/adminEmbed");

module.exports = {
  async execute(channel) {
    await channel.send({
      embeds: [adminEmbed],
      components: [row1, row2],
      ephemeral: false,
    });
    return;
  },
};

// Components
// ----------------------------------------------------------------------

const start = (isDisabled) => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setEmoji("🏁")
    .setLabel(`Start`)
    .setCustomId("start_tourney")
    .setDisabled(isDisabled || false);
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

const startCheckin = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("✅")
    .setLabel(`Checkin`)
    .setCustomId("start_tourney_checkin");
};

const deleteTournament = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setEmoji("🗑️")
    .setLabel(`Delete`)
    .setCustomId("confirm_delete_message");
};

const editDetails = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("✏️")
    .setLabel(`Edit`)
    .setCustomId("edit_details");
};

const row1 = new ActionRowBuilder().addComponents(
  start(),
  startCheckin(true),
  publish(),
  unpublish(true)
);
const row2 = new ActionRowBuilder().addComponents(editDetails(), deleteTournament());
