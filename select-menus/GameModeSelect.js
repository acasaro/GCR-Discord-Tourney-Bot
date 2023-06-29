/**
 * @name GameModeSelect
 * @type Select Menu
 * @description
 */
const {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} = require('discord.js');

const { getTournamentByCategoryId } = require('../common/utility-functions');

module.exports = {
  async execute(interaction) {
    const { channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const { game_mode } = tournament;

    try {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('game_mode_select')
        .setPlaceholder('Game mode')
        .addOptions(
          new StringSelectMenuOptionBuilder()
            .setLabel('1v1')
            .setValue('1v1')
            .setDefault(game_mode === '1v1'),
          new StringSelectMenuOptionBuilder()
            .setLabel('2v2')
            .setValue('2v2')
            .setDefault(game_mode === '2v2'),
          new StringSelectMenuOptionBuilder()
            .setLabel('3v3')
            .setValue('3v3')
            .setDefault(game_mode === '3v3'),
        );

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: 'Select your game mode',
        components: [row],
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
