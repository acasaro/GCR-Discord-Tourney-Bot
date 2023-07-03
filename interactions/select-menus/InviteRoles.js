const { roleMention } = require('discord.js');
const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');

/**
 * @name InviteRoles
 * @type Select Menu - Interaction
 * @description
 */

const timeoutDuration = 5000;

module.exports = {
  id: 'selected_roles',
  async execute(interaction) {
    try {
      const noReply = await interaction.deferUpdate();

      const { client, channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const selectedRoles = interaction?.values;
      const updatedValues = selectedRoles
        .map(role => roleMention(role))
        .join(' ');
      // Update tournament DB
      await updateTournament(tournament.id, {
        invited_roles: updatedValues,
      });

      const updatedAdminMessage = await AdminEmbed({
        tournament: {
          ...tournament,
          invited_roles: updatedValues,
        },
      });

      // Edit Admin message with updated values
      const getAdminMessage = await interaction.channel.messages.fetch(
        tournament.admin_message_id,
      );

      await getAdminMessage.edit(updatedAdminMessage);

      await interaction.editReply({
        content: `Successfully added roles to tournament`,
        components: [],
        ephemeral: true,
      });
      setTimeout(() => {
        // Delete the reply after the timeout
        noReply
          .delete()
          .then(() => {
            console.log('Reply deleted.');
          })
          .catch(error => {
            console.error('Error deleting reply:', error);
          });
      }, timeoutDuration);
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue updating game mode. \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
      });
      console.log(error);
    }
  },
};
