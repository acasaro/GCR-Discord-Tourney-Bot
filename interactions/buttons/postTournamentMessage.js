module.exports = {
  id: 'post_tourney',
  async execute(interaction) {
    try {
      await require('../../select-menus/PostChannelSelect').execute(
        interaction,
      );
    } catch (error) {
      console.log(error);
    }
    return;
  },
};
