const db = require('../../backend/db');
const { models } = db;
const { Tournament } = models;
const { ChannelType, PermissionsBitField } = require('discord.js');
const { CheckinEmbedMessage } = require('../../embeds/checkinEmbed');
const { AdminEmbed } = require('../../embeds/adminEmbed-alt');
const { getBotConfig } = require('../../common/utility-functions');
const { CountdownEmbedMessage } = require('../../embeds/countDownEmbed');

module.exports = {
  id: 'start_tourney_checkin',
  async execute(interaction) {
    try {
      // Get tournament from DB
      const tournament = await Tournament.findOne({
        where: {
          admin_channel_id: interaction.channelId,
        },
      });

      const { lobby_channel_id, admin_message_id, checkin_channel_id } =
        tournament.dataValues;
      if (!checkin_channel_id) {
        await createCheckinChannel(interaction).then(async response => {
          // Fetch tournament checkin channel
          const tournamentCheckinChannel =
            interaction.client.channels.cache.get(
              response.newCheckinChannel.id,
            );
          // Send checkin message to chat inside tournament lobby.
          const checkinMessage = await tournamentCheckinChannel.send(
            CheckinEmbedMessage({ checkinActive: true }),
          );

          // Edit Admin message with updated values
          const adminMessage = await interaction.channel.messages.fetch(
            admin_message_id,
          );

          const updatedAdminMessage = await AdminEmbed({
            tournament: {
              ...tournament.dataValues,
              checkin_active: true,
            },
          });

          await adminMessage.edit(updatedAdminMessage);

          await CountdownEmbedMessage({
            interaction,
            tournamentCheckinChannel,
            adminMessage,
            tournament,
            checkinMessage,
          });

          // If checkin_message_id doesn't exisit add it
          if (tournament.checkin_message_id !== checkinMessage.id.toString()) {
            await Tournament.update(
              {
                checkin_message_id: checkinMessage.id.toString(),
                checkin_channel_id: response.newCheckinChannel.id,
                checkin_active: true,
              },
              {
                where: {
                  id: tournament.id,
                },
              },
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content: `Something went wrong \n Error: ${JSON.stringify(error)}`,
      });
    }
  },
};

async function createCheckinChannel(interaction) {
  const { client, channel } = interaction;
  const guildId = interaction.guild.id;

  try {
    const guild = await client.guilds.cache.get(guildId);

    const newCheckinChannel = await guild.channels.create({
      name: `✅ Check-in`,
      type: ChannelType.GuildText,
      parent: channel.parentId,
      permissionOverwrites: [
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: guildId,
          deny: [PermissionsBitField.Flags.SendMessages],
        },
      ],
    });
    return { newCheckinChannel };
  } catch (error) {
    console.log(error);
  }
}
