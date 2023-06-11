const { ButtonBuilder, ButtonStyle } = require("discord.js");

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
    .setCustomId("delete_tournament");
};

const editDetails = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji("✏️")
    .setLabel(`Edit`)
    .setCustomId("edit_details");
};

module.exports = {
  start,
  cancel,
  publish,
  unpublish,
  startCheckin,
  deleteTournament,
  editDetails,
  create,
};
