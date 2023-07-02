const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');

const { PostEmbed } = require('../../embeds/postEmbed');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const timeoutDuration = 5000;

module.exports = {
  id: 'post_channel_select',
  async execute(interaction) {
    await interaction.deferUpdate();
    const { channel, guild } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const { admin_message_id, lobby_channel_id } = tournament;
    const organizer = interaction.user;

    try {
      const publish_channel_id = interaction?.values[0];
      const publishChannel = guild.channels.cache.get(publish_channel_id);
      if (!publishChannel) {
        await interaction.reply(
          'Publish channel not found, (it may have been deleted).',
        );
        return;
      } else {
        const joinUrl = `https://discord.com/channels/${guild.id}/${lobby_channel_id}`;

        // Post Tournament Message
        const postTournamentMessage = await publishChannel.send({
          ...(await PostEmbed({ tournament, organizer, joinUrl })),
        });

        const updatedTournamentValues = {
          ...tournament,
          publish_message_id: postTournamentMessage.id,
          publish_channel_id,
          status: 'published',
        };

        // Update DB
        await updateTournament(tournament.id, {
          ...updatedTournamentValues,
        });

        // Edit Admin message with updated values
        const adminMessage = await interaction.channel.messages.fetch(
          admin_message_id,
        );

        const updatedAdminMessage = await AdminEmbed({
          tournament: {
            ...updatedTournamentValues,
          },
        });

        await adminMessage.edit({
          ...updatedAdminMessage,
        });

        // Return Success Reply
        return await interaction.editReply({
          content: `I've successfully posted: **${tournament.title}** to: <#${publishChannel?.id}>`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue posting tournament. \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
      });
      console.log(error);
    }
  },
};
