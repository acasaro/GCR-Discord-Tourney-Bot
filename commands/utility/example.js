/**
 * @file Test
 * @type Slash Command
 * @description Example slash command.
 */

const { SlashCommandBuilder } = require('discord.js');
const { getUserRankedRole } = require('../../common/utility-functions');
const db = require('../../backend/db');
const { models } = db;
const { User } = models;

module.exports = {
  name: 'test',
  description: 'Example command to run',
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Example command to run'),
  async execute(interaction) {
    try {
      const { member } = interaction;
      const rankedRole = await getUserRankedRole(member);

      // Save to Database
      // --------------------------------------
      const user = await User.create({
        username: member.user.username,
        discord_id: member.user.id,
        discord_rank_role_id: rankedRole.id,
        discord_rank_role_name: rankedRole.name,
      });

      // Message Reply to Discord
      // --------------------------------------
      if (rankedRole) {
        return await interaction.reply({
          content: `User ${user.username} has been added to User table`,
          ephemeral: true,
        });
      } else {
        return await interaction.reply({
          content: `User ${interaction.member.displayName} does not have any matching role`,
          ephemeral: true,
        });
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return interaction.reply('That user already exists.');
      }
      console.log(error);
      return await interaction.reply({
        content: 'Something went wrong running your command!',
        ephemeral: true,
      });
    }
  },
};
