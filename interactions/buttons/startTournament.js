const {
  ChannelType,
  ThreadManager,
  ThreadAutoArchiveDuration,
} = require('discord.js');
const { teamSizes } = require('../../common/constants/tournaments');
const {
  getTournamentByCategoryId,
  getRegisteredUsers,
  createTournamentTeam,
  updateRegisteredUser,
} = require('../../common/utility-functions');
const { TeamEmbedMessage } = require('../../embeds/teamEmbed');
const { manageTeamsEmbed } = require('../../embeds/manageTeamsEmbed');

const skillRoles = [
  'SSL',
  'Grand Champion',
  'Champion',
  'Diamond',
  'Platinum',
  'Gold',
  'Silver',
  'Bronz',
]; // Adjust the skill roles as desired

const teams = {};

module.exports = {
  id: 'start_tourney',
  async execute(interaction) {
    try {
      const { client, channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const players = await getRegisteredUsers(tournament.id);
      const teamSize = teamSizes[tournament.game_mode];
      console.log(tournament.id);
      // await interaction.deferUpdate();

      await interaction.reply({
        content: `⌛ Generating teams...`,
        components: [],
        embeds: [],
      });

      // Make Teams

      if (players.length < teamSize) {
        sendResponse(
          interaction,
          'Not enough checked-in members to make teams.',
        );
        return;
      } else {
        let count = 1;
        // Sort players by rank
        players.sort((a, b) => b.rank_value - a.rank_value);

        // Create teams
        const teams = [];
        while (players.length > 0) {
          // Pair highest-ranked player with lowest-ranked player available
          const highRankPlayer = players.shift();
          const lowRankPlayer = players.pop();
          teams.push({
            teamName: `Team #${count}`,
            players: [highRankPlayer, lowRankPlayer],
            skillValue: highRankPlayer.rank_value + lowRankPlayer.rank_value,
          });
          count++;
        }
        // Create Teams Thread to list all teams
        const threadChannel = await channel.threads.create({
          name: 'teams',
          autoArchiveDuration: ThreadAutoArchiveDuration.ONE_DAY,
          reason: 'Creating thread to manage teams.',
          type: ChannelType.PrivateThread,
        });

        await threadChannel.send(await manageTeamsEmbed({ tournament }));
        interaction.editReply(`Added teams to a new thread: ${threadChannel}`);

        teams.forEach(async team => {
          await createTournamentTeam({
            name: team.teamName,
            players: JSON.stringify(team.players),
            skill_level: team.skillValue,
            voice_channel_id: null,
            tournament_id: tournament.id,
          });

          team.players.forEach(async player => {
            await updateRegisteredUser({
              ...player,
              status: 'matched',
            });
          });
          await threadChannel.send(
            await TeamEmbedMessage({ team, interaction }),
          );
        });

        // await Promise.all([sortedMembers, teamCount, balancedTeams]).then(
        //   async () => {
        //     return await interaction.editReply({
        //       content: `${teamCount} Teams have been created from checked-in players. \nGenerating team channels and moving teams private VC's`,
        //       components: [],
        //       embeds: [],
        //     });
        //   },
        // );

        // balancedTeams.forEach(async (teamMembers, i) => {
        //   const teamName = `Team ${i + 1}`;

        //   if (teamMembers.length > 0) {
        //     teams[teamName] = teamMembers;

        //     // Create temporary voice channel
        //     const newChannel = await channel.guild.channels.create({
        //       name: `Team #${i + 1}`,
        //       type: ChannelType.GuildVoice,
        //       parent: channel.parent,
        //     });

        //     teamMembers.forEach(async player => {
        //       const member =
        //         guild.members.cache.get(player.discord_id) ||
        //         (await guild.members.fetch(player.discord_id));

        //       // Check if the member is connected to a voice channel
        //       if (!member.voice.channel) {
        //         return channel.send(
        //           `\n\`\`\`${player.username} is not connected to voice. Can't connect to team channel.\n\`\`\``,
        //         );
        //       } else {
        //         member.voice.setChannel(newChannel);
        //       }
        //     });
        //   }
        // });

        // const remainingPlayers = sortedMembers.slice(teamCount * teamSize);

        // if (remainingPlayers.length > 0) {
        //   sendResponse(
        //     interaction,
        //     `These players do not have a team: \n
        //     ${remainingPlayers.map(player => player.username)}`,
        //   );
        // }

        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

// Helper Functions
// ----------------------------------------------------------------------

async function sendResponse(interaction, response) {
  try {
    await interaction.editReply(response);
  } catch (error) {
    console.log(error);
  }
}
