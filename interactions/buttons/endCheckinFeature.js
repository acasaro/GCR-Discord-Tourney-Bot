const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const { CheckinEmbedMessage } = require('../../embeds/checkinEmbed');

module.exports = {
  id: 'end_checkin',
  async execute(interaction) {
    try {
      const { channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const { checkin_message_id, lobby_channel_id, admin_message_id } =
        tournament;

      // Get the guild (server) where the interaction occurred
      const guild = interaction.guild;

      // Get the channel where you want to lookup the message
      const waitingRoomChannel = guild.channels.cache.get(lobby_channel_id);

      if (!waitingRoomChannel) {
        await interaction.reply(
          'Tournament waiting room channel not found, (it may have been deleted).',
        );
        return;
      }
      // Fetch the specific checkin message by its ID
      const checkinMessage = await waitingRoomChannel.messages.fetch(
        checkin_message_id,
      );

      const updatedCheckinMessage = await checkinMessage.edit(
        CheckinEmbedMessage({ checkinActive: false }),
      );

      await updateTournament(tournament.id, {
        checkin_message_id: updatedCheckinMessage.id.toString(),
        checkin_active: false,
      });

      // Edit Admin message with updated values
      const adminMessage = await interaction.channel.messages.fetch(
        admin_message_id,
      );

      const updatedAdminMessage = await AdminEmbed({
        tournament: {
          ...tournament,
          checkin_active: false,
        },
      });

      await adminMessage.edit(updatedAdminMessage);

      return await interaction.update({
        content: 'Check-in has ended',
        embeds: [],
        components: [],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
