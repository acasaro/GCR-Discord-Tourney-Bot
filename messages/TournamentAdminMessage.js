const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { adminEmbed } = require('../embeds/adminEmbed');
const db = require('../backend/db/models');
const { Tournament } = db;

module.exports = {
  async execute(tournamentId, discordChannel) {
    const tournament = await Tournament.findOne({
      where: {
        id: tournamentId,
      },
    });
    console.log(tournament.dataValues);
    if (tournament === null) {
      console.log('Tournament Not found!');
    } else {
      await discordChannel.send({
        embeds: [adminEmbed(tournament.dataValues)],
        components: [row1, row2],
        ephemeral: false,
      });
    }

    return;
  },
};

// Message Components
// ----------------------------------------------------------------------

const start = isDisabled => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Success)
    .setEmoji('🏁')
    .setLabel(`Start`)
    .setCustomId('start_tourney')
    .setDisabled(isDisabled || false);
};

const publish = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('📣')
    .setLabel(`Post`)
    .setCustomId('post_tourney');
};

const unpublish = isDisabled => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('⛔')
    .setLabel(`Unpost`)
    .setCustomId('unpost_tourney')
    .setDisabled(isDisabled || false);
};

const startCheckin = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('✅')
    .setLabel(`Checkin`)
    .setCustomId('start_tourney_checkin');
};

const deleteTournament = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🗑️')
    .setLabel(`Delete`)
    .setCustomId('confirm_message');
};

const editDetails = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('✏️')
    .setLabel(`Edit`)
    .setCustomId('show_edit_tournament');
};

const editGameMode = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🎮')
    .setLabel(`Mode`)
    .setCustomId('edit_game_mode');
};
const editStartDate = () => {
  return new ButtonBuilder()
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🗓')
    .setLabel(`Date`)
    .setCustomId('edit_start_date');
};

const row1 = new ActionRowBuilder().addComponents(
  start(),
  editDetails(),
  editGameMode(),
  startCheckin(true),
);
const row2 = new ActionRowBuilder().addComponents(
  editStartDate(),
  publish(),
  unpublish(true),
  deleteTournament(),
);
