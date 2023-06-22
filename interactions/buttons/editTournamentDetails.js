const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

module.exports = {
  id: 'show_edit_tournament',
  async execute(interaction) {
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('edit_tournament_modal')
      .setTitle('Tournament Details');

    // Create the text input components
    const tournamentNameInput = new TextInputBuilder()
      .setCustomId('tournament_name')
      .setLabel('Tournament Name')
      .setStyle(TextInputStyle.Short);

    const tournamentInfoInput = new TextInputBuilder()
      .setCustomId('tournament_info')
      .setLabel('Tournament information')
      .setStyle(TextInputStyle.Paragraph);

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
