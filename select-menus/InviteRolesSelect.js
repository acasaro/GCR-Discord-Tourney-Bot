/**
 * @name InviteRolesSelect
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
        .setCustomId('selected_roles')
        .setPlaceholder('Select Roles')
        .setMinValues(1)
        .setMaxValues(10);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: 'Select roles to include in tournament.',
        components: [row],
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
