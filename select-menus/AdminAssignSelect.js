/**
 * @name AdminAssignSelect
 * @type Select Menu
 * @description
 */
const {
  RoleSelectMenuBuilder,
  ActionRowBuilder,
  ChannelType,
} = require('discord.js');

module.exports = {
  async execute(interaction) {
    try {
      const selectMenu = new RoleSelectMenuBuilder()
        .setCustomId('admin_assign_select')
        .setPlaceholder('Select role')
        .setMinValues(1)
        .setMaxValues(1);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: 'Select a role allowed to use tourney bot.',
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
