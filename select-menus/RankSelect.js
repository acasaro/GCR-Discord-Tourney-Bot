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
const { ranks } = require('../common/constants/tournaments');

module.exports = {
  async execute(interaction) {
    const { channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);

    try {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('rank_select')
        .setPlaceholder('Select a rank');

      for (const rank of ranks) {
        selectMenu.addOptions({
          label: rank.name,
          value: rank.value.toString(),
          ...(rank.emoji && { emoji: rank.emoji }),
        });
      }

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: 'Select your current rank:',
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
