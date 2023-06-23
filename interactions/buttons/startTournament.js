const { ChannelType } = require('discord.js');
const { teamSizes } = require('../../common/constants/tournaments');
const {
  getTournamentByCategoryId,
  getRegisteredUsers,
} = require('../../common/utility-functions');

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
      const { guild, channel } = interaction;
      const parentChannelId = channel.parentId;
      const tournament = await getTournamentByCategoryId(parentChannelId);
      const players = await getRegisteredUsers(tournament.id);

      const teamSize = teamSizes[tournament.game_mode];

      await interaction.reply({
        content: `⌛ Making teams & starting tournament... 🏎`,
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
        const sortedMembers = sortMembersBySkill(players);
        const teamCount = Math.floor(players.length / teamSize);
        const balancedTeams = createBalancedTeams(sortedMembers, teamCount);

        await Promise.all([sortedMembers, teamCount, balancedTeams]).then(
          async () => {
            return await interaction.editReply({
              content: `${teamCount} Teams have been created from checked-in players. \nGenerating team channels and moving teams private VC's`,
              components: [],
              embeds: [],
            });
          },
        );

        balancedTeams.forEach(async (teamMembers, i) => {
          const teamName = `Team ${i + 1}`;

          if (teamMembers.length > 0) {
            teams[teamName] = teamMembers;

            // Create temporary voice channel
            const newChannel = await channel.guild.channels.create({
              name: `Team #${i + 1}`,
              type: ChannelType.GuildVoice,
              parent: channel.parent,
            });

            teamMembers.forEach(async player => {
              const member =
                guild.members.cache.get(player.discord_id) ||
                (await guild.members.fetch(player.discord_id));

              // Check if the member is connected to a voice channel
              if (!member.voice.channel) {
                return channel.send(
                  `\n\`\`\`${player.username} is not connected to voice. Can't connect to team channel.\n\`\`\``,
                );
              } else {
                member.voice.setChannel(newChannel);
              }
            });
          }
        });

        const remainingPlayers = sortedMembers.slice(teamCount * teamSize);

        if (remainingPlayers.length > 0) {
          sendResponse(
            interaction,
            `These players do not have a team: \n
            ${remainingPlayers.map(player => player.username)}`,
          );
        }

        // console.log(balancedTeams);
        // console.log(remainingPlayers);
        // console.log(balancedTeams.map(item => item));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

// Helper Functions
// ----------------------------------------------------------------------

function sortMembersBySkill(players) {
  const memberArray = Array.from(players.values());
  memberArray.sort((a, b) => {
    const aRoleIndex = getSkillRoleIndex(a);
    const bRoleIndex = getSkillRoleIndex(b);
    return bRoleIndex - aRoleIndex;
  });
  return memberArray;
}

function getSkillRoleIndex(member) {
  const role = member.discord_rank_role_name;
  for (let i = 0; i < skillRoles.length; i++) {
    if (role === skillRoles[i]) {
      return i;
    }
  }
  return Infinity; // Assign highest index for members without skill roles
}

function createBalancedTeams(sortedMembers, teamCount) {
  const teamMembers = new Array(teamCount).fill().map(() => []);

  let teamIndex = 0;
  sortedMembers.forEach(member => {
    teamMembers[teamIndex].push(member);
    teamIndex = (teamIndex + 1) % teamCount;
  });

  return teamMembers;
}

async function sendResponse(interaction, response) {
  try {
    await interaction.reply(response);
  } catch (error) {
    console.log(error);
  }
}
