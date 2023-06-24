module.exports = {
  id: 'edit_game_mode',
  async execute(interaction) {
    await require('../../select-menus/GameModeSelect').execute(interaction);

    return;
  },
};
