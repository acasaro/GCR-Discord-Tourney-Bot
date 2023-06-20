/**
 * @file editTournamentInfo
 * @type Modal Interaction
 * @description
 */

module.exports = {
  id: 'edit_tournament_modal',

  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    const tournamentName =
      interaction.fields.getTextInputValue('tournament_name');
    const tournamentInfo =
      interaction.fields.getTextInputValue('tournament_info');

    console.log({ tournamentName, tournamentInfo });

    await interaction.reply({
      content: 'Your submission was received successfully!',
    });
    return;
  },
};
