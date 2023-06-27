/**
 * @file Create
 * @type Slash Cmd
 * @description Creates initial setup for new tournament
 */

const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField,
} = require('discord.js');
const { config } = require('../../config');
const db = require('../../backend/db/models');
const { Tournament } = db;

module.exports = {
  name: 'create',
  description: 'Create a tournament',
  guildOnly: true,
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Create a tournament'),

  async execute(interaction) {
    await interaction.reply({
      content: `Creating tournament...`,
      components: [],
      embeds: [],
      ephemeral: true,
    });

    await creatTournamentChannels(interaction.client).then(async response => {
      const tournament = await Tournament.create({
        title: 'New Tournament',
        description: 'Not specified',
        game_mode: '2v2',
        organizer_id: interaction.member.user.id.toString(),
        admin_channel_id: response.newAdminChannel.id.toString(),
        parent_channel_id: response.newAdminChannel.parentId.toString(),
        start_date: null,
        start_time: null,
        timestamp: 'Not specified',
        publish_location_id: null,
        lobby_channel_id: response.lobbyChannel.id.toString(),
        status: 'draft',
      });

      await require('../../messages/TournamentAdminMessage').execute(
        tournament,
        response.newAdminChannel,
      );

      await interaction.editReply({
        content: `I've successfully created: **New Tournament**\nTo customize further and open registration, head to: <#${response.newAdminChannel?.id}>`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
    });
  },
};

async function creatTournamentChannels(client) {
  const guild = await client.guilds.cache.get(config.guildId);

  try {
    const category = await guild.channels.create({
      name: `🏆 New Tournament`,
      type: ChannelType.GuildCategory,
    });

    const newAdminChannel = await guild.channels.create({
      name: `admin`,
      type: ChannelType.GuildText,
      parent: category.id,
      permissionOverwrites: [
        {
          id: '1118501937768312912',
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: config.guildId,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    const lobbyChannel = await guild.channels.create({
      name: `🕐 Tournament Lobby`,
      type: ChannelType.GuildVoice,
      parent: category.id,
      permissionOverwrites: [
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.Connect],
        },
        {
          id: config.guildId,
          allow: [PermissionsBitField.Flags.Speak],
        },
      ],
    });

    return { newAdminChannel, lobbyChannel };
  } catch (error) {
    console.log(error);
  }
}
