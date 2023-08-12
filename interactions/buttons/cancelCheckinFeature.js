const {
  getTournamentByCategoryId,
  deleteRegisteredTournamentUsers,
  updateTournament,
} = require('../../common/utility-functions');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');

module.exports = {
  id: 'cancel_checkin',
  async execute(interaction) {
    try {
      const { channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const { checkin_message_id, checkin_channel_id, admin_message_id } =
        tournament;

      // Get the guild (server) where the interaction occurred
      const guild = interaction.guild;

      // Get the channel where you want to lookup the message
      const checkinChannel = guild.channels.cache.get(checkin_channel_id);

      if (!checkinChannel) {
        await interaction.reply(
          'Tournament checkin channel not found, (it may have been deleted).',
        );
        return;
      }

      // Delete all registered players
      await deleteRegisteredTournamentUsers(tournament.id);
      // Fetch the specific checkin message by its ID
      const checkinMessage = await checkinChannel.messages.fetch(
        checkin_message_id,
      );

      await checkinChannel.delete(checkin_message_id);

      // Edit Admin message with updated values
      const adminMessage = await interaction.channel.messages.fetch(
        admin_message_id,
      );

      const updatedAdminMessage = await AdminEmbed({
        tournament: {
          ...tournament.dataValues,
          checkin_active: false,
        },
      });

      await adminMessage.edit(updatedAdminMessage);

      await updateTournament(tournament.id, {
        checkin_message_id: null,
        checkin_channel_id: null,
        checkin_active: false,
      });

      return await interaction.update({
        content: 'Check-in has been canceled',
        embeds: [],
        components: [],
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
