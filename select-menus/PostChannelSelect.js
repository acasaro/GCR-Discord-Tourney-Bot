/**
 * @name PostChannelSelect
 * @type Select Menu
 * @description
 */
const {
  ChannelSelectMenuBuilder,
  ActionRowBuilder,
  ChannelType,
} = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      const selectMenu = new ChannelSelectMenuBuilder()
        .setCustomId('post_channel_select')
        .setPlaceholder('Select a channel')
        .setChannelTypes(ChannelType.GuildText);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: 'Select the channel to post tournament announcment to.',
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
