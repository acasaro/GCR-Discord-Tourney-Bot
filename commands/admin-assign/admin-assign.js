/**
 * @file admin-assign
 * @type Slash Command
 * @description Example slash command.
 */

const { SlashCommandBuilder } = require('discord.js');
// const { getUserRankedRole } = require('../../common/utility-functions');

module.exports = {
  name: 'admin-assign',
  description:
    'Select a role that is allowed to use tourney bot. Role has no permissions but required for bot to work.',
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName('admin-assign')
    .setDescription(
      'Select role to manage tourney bot. Role has no permissions but required for bot to work.',
    ),
  async execute(interaction) {
    try {
      await require('../../select-menus/AdminAssignSelect').execute(
        interaction,
      );
    } catch (error) {
      console.log(error);
      return await interaction.reply({
        content: 'Something went wrong running your command!',
        ephemeral: true,
      });
    }
  },
};
