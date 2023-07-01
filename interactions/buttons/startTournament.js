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
      const teamCount = Math.floor(players.length / teamSize);
      console.log({ teamCount, teamSize });
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
        const sortedMembers = sortMembersBySkill(players);

        // Create teams
        // const teams = [];
        // while (sortedMembers.length > 0) {
        //   // Pair highest-ranked player with lowest-ranked player available
        //   const highRankPlayer = sortedMembers.shift();
        //   const lowRankPlayer = sortedMembers.pop();
        //   teams.push({
        //     teamName: `Team #${count}`,
        //     players: [highRankPlayer, lowRankPlayer],
        //     skillValue: highRankPlayer.rank_value + lowRankPlayer.rank_value,
        //   });
        //   count++;
        // }
        let teams = [];

        if (teamSize === 1) {
          teams = players.map((player, index) => ({
            teamName: `Team #${index + 1}`,
            players: [player],
            skillValue: player.rank_value,
          }));
        } else {
          while (sortedMembers.length > 0) {
            // Create a new team
            const team = [];
            let highRankPlayer = null;
            let lowRankPlayer = null;
            // Add players to the team
            while (team.length < teamSize && sortedMembers.length > 0) {
              // Pair highest-ranked player with lowest-ranked player available
              highRankPlayer = sortedMembers.shift();
              team.push(highRankPlayer);
              if (sortedMembers.length > 0) {
                lowRankPlayer = sortedMembers.pop();
                team.push(lowRankPlayer);
              }
            }
            // Add the team to the list of teams
            teams.push({
              teamName: `Team #${count}`,
              players: team,
              skillValue: highRankPlayer.rank_value + lowRankPlayer.rank_value,
            });
            count++;
          }
        }
        let remainingPlayers =
          teamSize === 1 ? [] : sortedMembers.slice(teamCount * teamSize);
        if (remainingPlayers.length > 0) {
          remainingMessage = `These players do not have a team: \n
            ${remainingPlayers.map(player => player.username)}`;
        } else {
          remainingMessage = `All players have a team`;
        }

        // Create Teams Thread to list all teams
        const threadChannel = await channel.threads.create({
          name: 'teams',
          autoArchiveDuration: ThreadAutoArchiveDuration.ONE_DAY,
          reason: 'Creating thread to manage teams.',
          type: ChannelType.PrivateThread,
        });

        await threadChannel.send(
          await manageTeamsEmbed({ tournament, teamCount, remainingMessage }),
        );
        interaction.editReply(
          `Teams created and added to a new thread: ${threadChannel}`,
        );
        teams.forEach(async team => {
          console.log(team);
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
            await TeamEmbedMessage({
              team,
              interaction,
            }),
          );
        });

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

function sortMembersBySkill(members) {
  const memberArray = Array.from(members.values());
  memberArray.sort((a, b) => b.rank_value - a.rank_value);
  return memberArray;
}
