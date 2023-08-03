const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const { getTournamentByCategoryId } = require('../../common/utility-functions');
const dayjs = require('dayjs');

module.exports = {
  id: 'edit_start_date',
  async execute(interaction) {
    try {
      const { channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);

      const { start_date, start_time } = tournament;

      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId('tournament_date_modal')
        .setTitle('Set Tournament Start Date');
      // Create the text input components
      const tournamentNameInput = new TextInputBuilder()
        .setCustomId('start_date')
        .setLabel('Please enter a date (YYYY-MM-DD):')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(10)
        .setMinLength(10)
        .setValue(start_date || dayjs().format('YYYY-MM-DD'));

      const tournamentInfoInput = new TextInputBuilder()
        .setCustomId('start_time')
        .setLabel('Please enter a time (h:mm am/pm):')
        .setStyle(TextInputStyle.Short)
        .setValue(start_time || dayjs().format('h:mm A'));

      const firstActionRow = new ActionRowBuilder().addComponents(
        tournamentNameInput,
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        tournamentInfoInput,
      );

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);
      // Show the modal to the user
      await interaction.showModal(modal);
    } catch (error) {}
  },
};
