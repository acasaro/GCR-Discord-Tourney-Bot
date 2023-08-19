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
    try {
      await creatTournamentChannels(interaction).then(async response => {
        if (response === 'MISSING_BOT_ADMIN') {
          await interaction.editReply({
            content: `Tournament Admin role was not found in this server. \nType /admin assign to select a server role allowed to admin this bot`,
            components: [],
            embeds: [],
            ephemeral: true,
          });
        } else {
          const {
            tournamentLiveStage,
            tournamentAdminChannel,
            tournamentCategoryChannel,
            tornamentViewingChannel,
          } = response;
          console.log(tournamentAdminChannel.guild.roles);
          await tournamentCategoryChannel.permissionOverwrites.create(
            tournamentCategoryChannel.guild.roles.everyone,
            {
              ViewChannel: true,
              SendMessages: true,
              Connect: true,
              Speak: true,
            },
          );
          await tournamentLiveStage.permissionOverwrites.create(
            tournamentLiveStage.guild.roles.everyone,
            {
              ViewChannel: true,
              SendMessages: true,
              Connect: true,
              Speak: true,
            },
          );
          await tornamentViewingChannel.permissionOverwrites.create(
            tornamentViewingChannel.guild.roles.everyone,
            {
              ViewChannel: true,
              SendMessages: true,
              Connect: true,
              Speak: true,
            },
          );

          const tournament = await Tournament.create({
            title: 'New Tournament',
            description: `It's time for a new tournament! If you want to participate gather in the tournament lobby PROMPTLY at the above time. Check-in will begin exactly at tournament start time and will close 5 minutes after. Don't be late!`,
            game_mode: '2v2',
            organizer_id: interaction.member.user.id.toString(),
            admin_channel_id: response.tournamentAdminChannel.id.toString(),
            parent_channel_id:
              response.tournamentAdminChannel.parentId.toString(),
            start_date: null,
            start_time: null,
            timestamp: 'Not specified',
            publish_channel_id: interaction.channel.id.toString(),
            lobby_channel_id: response.tournamentLiveStage.id.toString(),
            teams_created_message_id: null,
            checkin_channel_id: null,
            teams_channel_id: null,
            status: 'draft',
            checkin_active: false,
          }).catch(error => console.log(error));

          await require('../../messages/TournamentAdminMessage').execute(
            tournament,
            response.tournamentAdminChannel,
          );

          await interaction.editReply({
            content: `I've successfully created: **New Tournament**\nTo customize further and open registration, head to: <#${response.tournamentAdminChannel?.id}>`,
            components: [],
            embeds: [],
            ephemeral: true,
          });
        }
      });
    } catch (error) {
      await interaction.editReply({
        content: `There was an issue while executing create command! \nError catch: \n\`\`\` ${error}\n\`\`\``,
        components: [],
        embeds: [],
        ephemeral: true,
      });
    }
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

    const tournamentCategoryChannel = await guild.channels.create({
      name: `New Tournament`,
      type: ChannelType.GuildCategory,
      guild_id: guildId,
      parent_channel_id: null,
      position: 0,
      permissionOverwrites: [],
    });

    const tornamentViewingChannel = await guild.channels.create({
      name: `🎥 Watch Live `,
      type: ChannelType.GuildVoice,
      parent: tournamentCategoryChannel.id,
      permissionOverwrites: [],
    });

    const tournamentAdminChannel = await guild.channels.create({
      name: `🔒 Admin`,
      type: ChannelType.GuildText,
      parent: tournamentCategoryChannel.id,
      position: 0,
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

    const tournamentLiveStage = await guild.channels.create({
      name: `🏆 Tournament Stage`,
      type: ChannelType.GuildStageVoice,
      parent: tournamentCategoryChannel.id,
      position: 0,
      // permissionOverwrites: [
      //   {
      //     id: guildId,
      //     allow: [PermissionsBitField.Flags.ViewChannel],
      //   },
      //   {
      //     id: guildId,
      //     allow: [PermissionsBitField.Flags.Connect],
      //   },
      //   {
      //     id: guildId,
      //     allow: [PermissionsBitField.Flags.Speak],
      //   },

      //   {
      //     id: guildId,
      //     allow: [PermissionsBitField.Flags.ReadMessageHistory],
      //   },
      //   {
      //     id: guildId,
      //     allow: [PermissionsBitField.Flags.RequestToSpeak],
      //   },
      // ],
    });

    return {
      tournamentAdminChannel,
      tournamentLiveStage,
      tournamentCategoryChannel,
      tornamentViewingChannel,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
