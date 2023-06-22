const { tournamentRankedRoles } = require('./constants/discord');
const db = require('../backend/db/models');
const { Tournament, Registration } = db;
/**
 ***************************************************
 * @name getUserRankedRole
 * @param {*} member
 * @returns Output: { id: 1, name: 'Champion' }
 ***************************************************
 */
async function getUserRankedRole(member) {
  try {
    const userRoles = member.roles.cache.map(role => ({
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
/**
 ***************************************************
 * @name getTournamentByCategoryId
 * @param {*} categoryChannelId
 * @returns Tournament from db
 ***************************************************
 */
async function getTournamentByCategoryId(categoryChannelId) {
  try {
    const tournament = await Tournament.findOne({
      where: {
        parent_channel_id: categoryChannelId,
      },
    });
    return tournament.dataValues;
  } catch (error) {
    console.log(error);
    return error;
  }
}
/**
 ***************************************************
 * @name registerTournamentUser
 * @param {*} newRegistrationValues object
 * @returns Tournament from db
 ***************************************************
 */
async function registerTournamentUser(newRegistrationValues) {
  try {
    const alreadyCheckedIn = await Registration.findOne({
      where: {
        discord_id: newRegistrationValues.discord_id,
        tournament_id: newRegistrationValues.tournament_id,
      },
    });
    if (alreadyCheckedIn) {
      return `You're already checked-in to this tournament`;
    } else {
      await Registration.create(newRegistrationValues);
      return 'You are successfully checked-in';
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name deleteRegisteredTournamentUsers
 * @param {*} tournamentId
 * @returns Promise
 ***************************************************
 */
async function deleteRegisteredTournamentUsers(tournamentId) {
  try {
    return await Registration.destroy({
      where: {
        tournament_id: tournamentId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name updateTournament
 * @param {*} tournamentId
 * @param updatedValues { name: "Fancy Pants", ...}
 * @returns Promise
 ***************************************************
 */
async function updateTournament(tournamentId, updatedValues) {
  try {
    return await Tournament.update(updatedValues, {
      where: {
        id: tournamentId.id,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  updateTournament,
  deleteRegisteredTournamentUsers,
  registerTournamentUser,
  getUserRankedRole,
  getTournamentByCategoryId,
};
