const { ChannelType, PermissionsBitField } = require('discord.js');
const { config } = require('../../config');
const db = require('../../backend/db/models');
const { Tournament } = db;

module.exports = {
  id: 'create_tourney',
  async execute(interaction) {
    await interaction.update({
      content: `Creating tournament...`,
      components: [],
      embeds: [],
      ephemeral: true,
    });

    await creatTournamentChannels(interaction.client).then(async response => {
      const tournament = await Tournament.create({
        title: 'New Tournament',
        description: null,
        game_mode: '2v2',
        organizer_id: interaction.member.user.id,
        admin_channel_id: response.id,
        parent_channel_id: response.parentId,
        startDate: null,
        publish_location_id: null,
      });
      await require('../../messages/TournamentAdminMessage').execute(response);

      await interaction.editReply({
        content: `I've successfully created: **New Tournament**\nTo customize further and open registration, head to: <#${response?.id}>`,
        components: [],
        embeds: [],
        ephemeral: true,
      });
    });

    return;
  },
};

async function creatTournamentChannels(client) {
  const guild = await client.guilds.cache.get(config.guildId);

  try {
    const category = await guild.channels.create({
      name: `New Tournament`,
      type: ChannelType.GuildCategory,
    });

    const newAdminChannel = await guild.channels.create({
      name: `Admin`,
      type: ChannelType.GuildText,
      parent: category.id,
    });

    await guild.channels.create({
      name: `Tournament Lobby`,
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

    // await newAdminChannel.send(await AdminControlsMessage({ isEphemeral: false }));

    return newAdminChannel;
  } catch (error) {
    console.log(error);
  }
}
