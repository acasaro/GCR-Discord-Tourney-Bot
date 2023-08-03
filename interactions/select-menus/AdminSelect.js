const { roleMention } = require('discord.js');
const { updateBotConfig } = require('../../common/utility-functions');

/**
 * @name AdminSelect
 * @type Select Menu - Interaction
 * @description
 */

module.exports = {
  id: 'admin_assign_select',
  async execute(interaction) {
    const { guild } = interaction;
    try {
      const noReply = await interaction.deferUpdate();

      const selectedRole = interaction?.values[0];
      console.log(selectedRole);

      await interaction.editReply({
        content: `I've assigned ${roleMention(
          selectedRole,
        )} as users who can manage tournaments.\nUsers with Manage Server+ permissions do not need this`,
        components: [],
        ephemeral: false,
      });

      // Update tournament DB
      await updateBotConfig(guild.id, {
        bot_admin_role_id: selectedRole,
      });
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue assigning admin. \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
      });
      console.log(error);
    }
  },
};
