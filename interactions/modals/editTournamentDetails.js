/**
 * @file editTournamentInfo
 * @type Modal Interaction
 * @description
 */
const db = require('../../backend/db/models');
const { adminEmbed } = require('../../embeds/adminEmbed');
const { Tournament } = db;
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  id: 'edit_tournament_modal',
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    // Get modal input fields
    const tournamentName =
      interaction.fields.getTextInputValue('tournament_name');
    const tournamentInfo =
      interaction.fields.getTextInputValue('tournament_info');

    // Get tournament from DB
    const tournament = await Tournament.findOne({
      where: {
        admin_channel_id: interaction.channelId,
      },
    });

    // Merge tournament values with new modal values
    const { admin_message_id } = tournament.dataValues;
    const updatedTournamentValues = {
      ...tournament.dataValues,
      title: tournamentName,
      description: tournamentInfo,
    };

    // Update tournament in DB
    await Tournament.update(
      { title: tournamentName, description: tournamentInfo },
      {
        where: {
          id: tournament.id,
        },
      },
    );

    // Edit Admin message with updated values
    const adminMessage = await interaction.channel.messages.fetch(
      admin_message_id,
    );

    adminMessage.edit({
      embeds: [adminEmbed(updatedTournamentValues)],
      components: [row1, row2],
      ephemeral: false,
    });

    await interaction.deferUpdate();
    return;
  },
};

// Message Components
// NOTE: This is duplicated code and can be better organized to reference
// admin message embed as a dynamic function with better values for config
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
