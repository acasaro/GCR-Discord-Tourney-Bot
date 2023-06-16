const {tournamentRankedRoles} = require('./constants/discord');

/**
 *
 *
 * @name getUserRankedRole
 * @param {*} interaction
 * @returns Output: { id: 1, name: 'Champion' }
 *
 */
async function getUserRankedRole(interaction) {
  try {
    const user = interaction.member;
    const userRoles = user.roles.cache.map(role => ({
      id: role.id,
      name: role.name,
    }));

    for (const roleKey in tournamentRankedRoles) {
      const roleName = tournamentRankedRoles[roleKey];
      const matchingRoles = userRoles.filter(role => role.name === roleName);
      if (matchingRoles.length > 0) {
        return matchingRoles[0];
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  getUserRankedRole,
};
