const { tournamentRankedRoles } = require('./constants/discord');
const db = require('../backend/db');
const { logError } = require('./utility-logging');
const { models } = db;
const { Tournament, Registration } = models;
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
        id: tournamentId,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name deleteTournament
 * @param {*} tournamentId
 * @returns Promise
 ***************************************************
 */
async function deleteTournament(tournamentId) {
  const t = await db.transaction();

  try {
    await Tournament.destroy(
      {
        where: {
          id: tournamentId,
        },
      },
      { transaction: t },
    );

    await Registration.destroy(
      {
        where: {
          tournament_id: tournamentId,
        },
      },
      { transaction: t },
    );

    return await t.commit();
  } catch (error) {
    logError(error);
    await t.rollback();

    return error;
  }
}

/**
 ***************************************************
 * @name getRegisteredUsers
 * @param {*} tournamentId
 * @returns Array registered users in a tournament
 ***************************************************
 */
async function getRegisteredUsers(tournamentId) {
  try {
    const queryRegistration = await Registration.findAll({
      where: {
        tournament_id: tournamentId,
      },
    });

    const response = queryRegistration.map(({ dataValues }) => {
      const {
        username,
        tournament_id,
        discord_id,
        discord_rank_role_id,
        discord_rank_role_name,
      } = dataValues;

      return {
        username,
        tournament_id,
        discord_id,
        discord_rank_role_id,
        discord_rank_role_name,
      };
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name updateCategoryChannelName
 * @param {*} categoryChannel
 * @param {*} newTitle
 * @returns Promise
 ***************************************************
 */
async function updateCategoryChannelName(categoryChannel, newTitle) {
  try {
    const updatedCategory = await categoryChannel.setName(newTitle);
    return console.log(
      `Category channel title updated: ${updatedCategory.name}`,
    );
  } catch (error) {
    console.error('Error updating category channel title:', error);
    return error;
  }
}

module.exports = {
  updateCategoryChannelName,
  getRegisteredUsers,
  updateTournament,
  deleteRegisteredTournamentUsers,
  registerTournamentUser,
  getUserRankedRole,
  getTournamentByCategoryId,
  deleteTournament,
};
