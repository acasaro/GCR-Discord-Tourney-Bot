const { getTournamentByCategoryId } = require('../../common/utility-functions');
const { CheckinEmbedMessage } = require('../../embeds/checkinEmbed');

module.exports = {
  id: 'end_checkin',
  async execute(interaction) {
    try {
      const { member, channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const { checkin_message_id, lobby_channel_id } = tournament;

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

      await checkinMessage.edit(CheckinEmbedMessage({ checkinActive: false }));

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
