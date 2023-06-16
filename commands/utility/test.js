/**
 * @file Test
 * @type Slash Command
 * @description Example slash command.
 */

const {SlashCommandBuilder} = require('discord.js');
const {getUserRankedRole} = require('../../common/utility-functions');

module.exports = {
  name: 'test',
  description: 'Example command to run',
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Example command to run'),
  async execute(interaction) {
    try {
      // Helper function that gets users ranked role
      const rankedRole = await getUserRankedRole(interaction);

      if (rankedRole) {
        return await interaction.reply({
          content: `User ${interaction.member.displayName} has the ranked role: ${rankedRole.name}`,
          ephemeral: true,
        });
      } else {
        return await interaction.reply({
          content: `User ${interaction.member.displayName} does not have any matching role`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(error);
      return await interaction.reply({
        content: 'There was an issue running your command!',
        ephemeral: true,
      });
    }
  },
};
