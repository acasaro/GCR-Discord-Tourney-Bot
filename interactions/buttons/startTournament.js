const {
  ChannelType,
  ThreadManager,
  ThreadAutoArchiveDuration,
  PermissionsBitField,
} = require('discord.js');
const { teamSizes } = require('../../common/constants/tournaments');
const {
  getTournamentByCategoryId,
  getRegisteredUsers,
  createTournamentTeam,
  updateRegisteredUser,
  getBotConfig,
  updateTournament,
} = require('../../common/utility-functions');
const { TeamEmbedMessage } = require('../../embeds/teamEmbed');
const { manageTeamsEmbed } = require('../../embeds/manageTeamsEmbed');

const teams = {};

module.exports = {
  id: 'start_tourney',
  async execute(interaction) {
    try {
      const { client, channel } = interaction;
      const guildId = interaction.guild.id;
      const guild = await client.guilds.cache.get(guildId);

      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);

      const { teams_created_message_id, lobby_channel_id } = tournament;
      const players = await getRegisteredUsers(tournament.id);
      const teamSize = teamSizes[tournament.game_mode];
      const teamCount = Math.floor(players.length / teamSize);
      // await interaction.deferUpdate();
      await interaction.reply({
        content: `⌛ Generating teams...`,
        components: [],
        embeds: [],
        ephemeral: true,
      });

      if (tournament.checkin_active) {
        return sendResponse(
          interaction,
          'Your tournament is in the middle of a checkin, please end that first.',
          { ephemeral: true },
        );
      }
      if (players.length < teamSize) {
        // Check if enough players are checked-in
        sendResponse(
          interaction,
          'Not enough checked-in members to make teams.',
          { ephemeral: true },
        );
        return;
      } else {
        let count = 1;
        // Sort players by rank
        const sortedMembers = sortMembersBySkill(players);
        const remainingPlayerCount = players.length % teamSize;
        let remainingPlayers = [];
        if (remainingPlayerCount > 0) {
          remainingPlayers = sortedMembers.splice(teamCount * teamSize);
        }

        let teams = [];

        // console.log({ remainingPlayerCount, remainingPlayers, sortedMembers });
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

        if (remainingPlayers.length > 0) {
          remainingMessage = `Some players do not have a team:
            ${remainingPlayers.map(player => `<@${player.discord_id}>`)}`;
        } else {
          remainingMessage = `All players have a team`;
        }

        // Create Teams Thread to list all teams
        const teamChannel = await guild.channels.create({
          name: '👥 Teams',
          type: ChannelType.GuildText,
          parent: channel.parentId,
          permissionOverwrites: [
            {
              id: guildId,
              deny: [PermissionsBitField.Flags.SendMessages],
            },
            {
              id: guildId,
              allow: [PermissionsBitField.Flags.ViewChannel],
            },
          ],
        });

        await teamChannel.permissionOverwrites.create(
          channel.guild.roles.everyone,
          { ViewChannel: true, SendMessages: false },
        );
        // Update Tournament with teams_channel_id
        await updateTournament(tournament.id, {
          teams_channel_id: teamChannel.id,
        });

        await interaction.channel.send(
          await manageTeamsEmbed({
            tournament,
            teamCount,
            remainingMessage,
          }),
        );

        interaction.editReply(
          `Teams created and listed in a new channel: ${teamChannel}`,
        );

        // Fetch tournament stage channel
        const tournamentStageChannel =
          interaction.client.channels.cache.get(lobby_channel_id);

        // Send checkin message to chat inside tournament lobby.
        const teamsCreatedMessage = await tournamentStageChannel.send(
          `Teams are created! You can view them here: ${teamChannel}`,
        );

        // If checkin_message_id doesn't exisit add it
        if (
          tournament.teamsCreatedMessage !== teamsCreatedMessage.id.toString()
        ) {
          await updateTournament(tournament.id, {
            teams_created_message_id: teamsCreatedMessage.id.toString(),
          });
        }

        teams.forEach(async team => {
          // console.log(team);
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
          await teamChannel.send(
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

async function sendResponse(interaction, response, options) {
  try {
    await interaction.editReply({ content: response, ...options });
  } catch (error) {
    console.log(error);
  }
}

function sortMembersBySkill(members) {
  const memberArray = Array.from(members.values());
  memberArray.sort((a, b) => b.rank_value - a.rank_value);
  return memberArray;
}
