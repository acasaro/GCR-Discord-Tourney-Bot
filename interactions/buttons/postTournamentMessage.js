const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const {
  getTournamentByCategoryId,
  updateTournament,
} = require('../../common/utility-functions');
const { logError } = require('../../common/utility-logging');
const { PostEmbed } = require('../../embeds/postEmbed');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');

module.exports = {
  id: 'post_tourney',
  async execute(interaction) {
    const { channel, guild } = interaction;
    const parentChannelId = channel.parentId;
    const tournament = await getTournamentByCategoryId(parentChannelId);
    const { admin_message_id, lobby_channel_id } = tournament;
    const organizer = interaction.user;
    try {
      // Get Publish Channel
      const publishChannel = guild.channels.cache.get(
        tournament.publish_channel_id,
      );
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

        // Update DB
        await updateTournament(tournament.id, {
          ...tournament,
          publish_message_id: postTournamentMessage.id,
          status: 'published',
        });

        // Edit Admin message with updated values
        const adminMessage = await interaction.channel.messages.fetch(
          admin_message_id,
        );

        const updatedTournamentValues = {
          ...tournament,
          status: 'published',
        };

        const updatedAdminMessage = await AdminEmbed({
          tournament: {
            ...updatedTournamentValues,
          },
        });

        await adminMessage.edit(updatedAdminMessage);

        // Return Success Reply
        return await interaction.reply({
          content: `I've successfully posted: **${tournament.title}** to: <#${publishChannel?.id}>`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      }
    } catch (error) {
      logError(error);
    }
    return;
  },
};
