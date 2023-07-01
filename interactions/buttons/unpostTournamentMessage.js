const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');

module.exports = {
  id: 'unpost_tourney',
  async execute(interaction) {
    const { guild, channel } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const { admin_message_id, publish_message_id, publish_channel_id } =
      tournament;

    const publishChannel = await guild.channels.cache.get(publish_channel_id);
    // Get Admin message & Posted Message
    const adminMessage = await interaction.channel.messages.fetch(
      admin_message_id,
    );

    const postedMessage = await publishChannel.messages.fetch(
      publish_message_id,
    );
    // Delete posted message
    await postedMessage.delete();
    // Update DB
    await updateTournament(tournament.id, {
      status: 'draft',
    });

    const updatedAdminMessage = await AdminEmbed({
      tournament: {
        ...tournament,
        status: 'draft',
      },
    });
    await adminMessage.edit(updatedAdminMessage);

    await interaction.reply({
      content: 'Tournament announcement un-posted',
      ephemeral: true,
    });
    try {
    } catch (error) {
      console.log(error);
    }
    return;
  },
};
