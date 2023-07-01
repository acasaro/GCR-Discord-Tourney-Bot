const {
  ChannelType,
  ThreadManager,
  ThreadAutoArchiveDuration,
} = require('discord.js');
const { teamSizes } = require('../../common/constants/tournaments');
const {
  getTournamentByCategoryId,
  getRegisteredUsers,
  getTournamentTeams,
} = require('../../common/utility-functions');
const { TeamEmbedMessage } = require('../../embeds/teamEmbed');
const { manageTeamsEmbed } = require('../../embeds/manageTeamsEmbed');
const teamsCollection = {};
module.exports = {
  id: 'send_to_voice',
  async execute(interaction) {
    try {
      const { guild, channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      if (!tournament) {
        return console.log('Tournament not found');
      } else {
        const teams = await getTournamentTeams(tournament.id);
        const teamSize = teamSizes[tournament.game_mode];

        await interaction.reply({
          content: `⌛ Generating team channels and moving teams private VC's`,
          components: [],
          embeds: [],
        });

        teams.forEach(async (team, i) => {
          const teamName = team.name;
          const teamMembers = JSON.parse(team.players) || [];
          console.log(teamMembers);
          if (teamMembers.length > 0) {
            teamsCollection[teamName] = teamMembers;

            //Create temporary voice channel
            const newChannel = await channel.guild.channels.create({
              name: teamName,
              type: ChannelType.GuildVoice,
              parent: tournament.parent_channel_id,
            });

            teamMembers.forEach(async player => {
              const member = await guild.members.fetch(player.discord_id);
              // Check if the member is connected to a voice channel
              if (!member.voice.channel) {
                return channel.send(
                  `\n\`\`\`${player.username} is not connected to voice. Can't connect to team channel.\n\`\`\``,
                );
              } else {
                await member.voice.setChannel(newChannel);
              }
            });
          }
        });
        await interaction.editReply({
          content: `Teams have been moved to private VC's`,
          components: [],
          embeds: [],
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
