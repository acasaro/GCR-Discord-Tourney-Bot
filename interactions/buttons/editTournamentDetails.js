const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const { getTournamentByCategoryId } = require('../../common/utility-functions');

module.exports = {
  id: 'show_edit_tournament',
  async execute(interaction) {
    const { channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    const { title, description } = tournament;

    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('edit_tournament_modal')
      .setTitle('Tournament Details');

    // Create the text input components
    const tournamentNameInput = new TextInputBuilder()
      .setCustomId('tournament_name')
      .setLabel('Tournament Name')
      .setStyle(TextInputStyle.Short)
      .setValue(title || '');

    const tournamentInfoInput = new TextInputBuilder()
      .setCustomId('tournament_info')
      .setLabel('Tournament information')
      .setStyle(TextInputStyle.Paragraph)
      .setValue(description || '');

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
  },
};
