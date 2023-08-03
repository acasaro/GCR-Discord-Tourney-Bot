const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');

/**
 * @name SelectGameMode
 * @type Select Menu - Interaction
 * @description
 */

const timeoutDuration = 5000;

module.exports = {
  id: 'game_mode_select',
  async execute(interaction) {
    try {
      await interaction.deferUpdate();

      const { channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const selectedGameMode = interaction?.values[0];
      // Update tournament DB
      await updateTournament(tournament.id, {
        game_mode: selectedGameMode,
      });

      const updatedAdminMessage = await AdminEmbed({
        tournament: {
          ...tournament,
          game_mode: selectedGameMode,
        },
      });
      // Edit Admin message with updated values
      const getAdminMessage = await interaction.channel.messages.fetch(
        tournament.admin_message_id,
      );

      await getAdminMessage.edit(updatedAdminMessage);

      await interaction
        .editReply({
          content: `Successfully updated game mode to \`${selectedGameMode}\``,
          components: [],
          ephemeral: true,
        })
        .then(async reply => {
          // Wait for the specified timeout duration
          setTimeout(() => {
            // Delete the reply after the timeout
            reply
              .delete()
              .then(() => {
                console.log('Reply deleted.');
              })
              .catch(error => {
                console.error('Error deleting reply:', error);
              });
          }, timeoutDuration);
        })
        .catch(error => {
          console.error('Error sending reply:', error);
        });
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue updating game mode. \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
      });
      console.log(error);
    }
  },
};
