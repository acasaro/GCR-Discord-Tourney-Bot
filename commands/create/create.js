const db = require('../../backend/db');
const { getBotConfig } = require('../../common/utility-functions');
const { models } = db;
const { Tournament } = models;
const { config } = require('../../config');
const {
  SlashCommandBuilder,
  ChannelType,
  PermissionsBitField,
} = require('discord.js');
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

    await creatTournamentChannels(interaction).then(async response => {
      if (response === 'MISSING_BOT_ADMIN') {
        await interaction.editReply({
          content: `Tournament Admin role was not found in this server. \nType /admin assign to select a server role allowed to admin this bot`,
          components: [],
          embeds: [],
          ephemeral: true,
        });
      } else {
        const tournament = await Tournament.create({
          title: 'New Tournament',
          description: `It's time for a new tournament! If you want to participate gather in the tournament lobby PROMPTLY at the above time. Check-in will begin exactly at tournament start time and will close 5 minutes after. Don't be late!`,
          game_mode: '2v2',
          organizer_id: interaction.member.user.id.toString(),
          admin_channel_id: response.newAdminChannel.id.toString(),
          parent_channel_id: response.newAdminChannel.parentId.toString(),
          start_date: null,
          start_time: null,
          timestamp: 'Not specified',
          publish_channel_id: interaction.channel.id.toString(),
          lobby_channel_id: response.lobbyChannel.id.toString(),
          status: 'draft',
          checkin_active: false,
        }).catch(error => console.log(error));

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
      }
    });
  },
};

async function creatTournamentChannels(interaction) {
  const { client } = interaction;
  const guildId = interaction.guild.id;

  try {
    const guild = await client.guilds.cache.get(guildId);
    const botConfig = await getBotConfig(guildId);

    if (botConfig.bot_admin_role_id === null) {
      return 'MISSING_BOT_ADMIN';
    }

    const category = await guild.channels.create({
      name: `New Tournament`,
      type: ChannelType.GuildCategory,
      permissionOverwrites: [
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.Speak],
        },
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.Connect],
        },
      ],
    });

    const newAdminChannel = await guild.channels.create({
      name: `admin`,
      type: ChannelType.GuildText,
      parent: category.id,
      permissionOverwrites: [
        {
          id: botConfig.bot_admin_role_id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: guildId,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });

    const lobbyChannel = await guild.channels.create({
      name: `🏆 Tournament Stage`,
      type: ChannelType.GuildStageVoice,
      parent: category.id,
      permissionOverwrites: [
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.Connect],
        },
        {
          id: guildId,
          allow: [PermissionsBitField.Flags.Speak],
        },
      ],
    });

    return { newAdminChannel, lobbyChannel };
  } catch (error) {
    console.log(error);
  }
}
