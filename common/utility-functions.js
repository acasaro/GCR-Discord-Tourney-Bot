const { tournamentRankedRoles } = require('./constants/discord');
const db = require('../backend/db');
const { logError } = require('./utility-logging');
const { models } = db;
const { Tournament, Registration, Team, Config } = models;
const { Op } = require('sequelize');

/**
 ***************************************************
 * @name getBotConfig
 * @param {*} guildId String
 * @returns Global configurations from DB
 ***************************************************
 */
async function getBotConfig(guildId) {
  try {
    const doesExist = await Config.findOne({
      where: {
        guild_id: guildId,
      },
    });

    if (!doesExist) {
      // Create a bot config
      const newConfig = await Config.create({
        guild_id: guildId,
        bot_admin_role_id: null,
        default_publish_channel_id: null,
      });
      return newConfig.dataValues;
    }
    return doesExist.dataValues;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name updateBotConfig
 * @param {*} guildId String
 * @param {*} updatedValues String
 * @returns Global configurations from DB
 ***************************************************
 */
async function updateBotConfig(guildId, updatedValues) {
  try {
    await Config.update(updatedValues, {
      where: {
        guild_id: guildId,
      },
    });

    return console.log('Config  successfully updated');
  } catch (error) {
    console.log(error);
    return error;
  }
}

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
        [Op.or]: [
          {
            parent_channel_id: {
              [Op.eq]: categoryChannelId,
            },
          },
          {
            admin_channel_id: {
              [Op.eq]: categoryChannelId,
            },
          },
        ],
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
 * @name checkIfExists
 * @param {*} checkIfExists object
 * @returns Tournament from db
 ***************************************************
 */
async function checkIfExists(tournamentId, userId) {
  try {
    const doesExist = await Registration.findOne({
      where: {
        discord_id: userId,
        tournament_id: tournamentId,
      },
    });
    return doesExist;
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
      await Registration.update(newRegistrationValues);
      return `Updated your checked-in rank for this tournament`;
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
 * @name checkIfRegistered
 * @param {*} discordId object
 * @param {*} tournamentId object
 * @returns Boolean if registered
 ***************************************************
 */
async function checkIfRegistered(discordId, tournamentId) {
  try {
    const alreadyCheckedIn = await Registration.findOne({
      where: {
        discord_id: discordId,
        tournament_id: tournamentId,
      },
    });
    if (alreadyCheckedIn) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name updateRegisteredUser
 * @param {*} updatedValues object
 * @returns updates status from registration
 ***************************************************
 */
async function updateRegisteredUser(updatedValues) {
  try {
    const userExists = await Registration.findOne({
      where: {
        discord_id: updatedValues.discord_id,
        tournament_id: updatedValues.tournament_id,
      },
    });
    if (!userExists) {
      console.log(`User registration doesn't exist`);
      return `User registration doesn't exist`;
    } else {
      await Registration.update(updatedValues, {
        where: {
          discord_id: updatedValues.discord_id,
          tournament_id: updatedValues.tournament_id,
        },
      });
      console.log('User registration successfully updated');

      return `User registration successfully updated to: ${updatedValues.rank_role_name}`;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name updateTeam
 * @param {*} updatedValues object
 * @returns updates status from registration
 ***************************************************
 */
async function updateTeam(teamId, updatedValues) {
  try {
    await Team.update(updatedValues, {
      where: {
        id: teamId,
      },
    });

    return console.log('Team  successfully updated');
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
 * @name deleteRegisteredTournamentUser
 * @param {*} tournamentId
 * @param {*} discordId
 * @returns Promise
 ***************************************************
 */
async function deleteRegisteredTournamentUser(tournamentId, discordId) {
  try {
    return await Registration.destroy({
      where: {
        tournament_id: tournamentId,
        discord_id: discordId,
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
    await Team.destroy(
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

    const response = queryRegistration.map(({ dataValues }) => dataValues);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name createTournamentTeam
 * @param {*} newTeamValues object
 * @returns Tournament from db
 ***************************************************
 */
async function createTournamentTeam(newTeamValues) {
  try {
    await Team.create(newTeamValues);
    return console.log(`${newTeamValues.name} successfully created`);
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name getTournamentTeams
 * @param {*} tournamentId
 * @returns Array teams matched for tournament
 ***************************************************
 */
async function getTournamentTeams(tournamentId) {
  try {
    const queryTeams = await Team.findAll({
      where: {
        tournament_id: tournamentId,
      },
    });

    const response = queryTeams.map(({ dataValues }) => dataValues);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 ***************************************************
 * @name deleteTournamentTeam
 * @param {*} tournamentId
 * @returns console log
 ***************************************************
 */
async function deleteTournamentTeam(teamId) {
  try {
    await Team.destroy({
      where: {
        id: teamId,
      },
    });
    return console.log(`Successfully deleted team ${teamId}`);
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
  getBotConfig,
  getTournamentByCategoryId,
  getRegisteredUsers,
  getTournamentTeams,
  getUserRankedRole,
  updateBotConfig,
  updateCategoryChannelName,
  updateRegisteredUser,
  updateTournament,
  updateTeam,
  registerTournamentUser,
  createTournamentTeam,
  deleteTournament,
  deleteTournamentTeam,
  deleteRegisteredTournamentUsers,
  deleteRegisteredTournamentUser,
  checkIfExists,
  checkIfRegistered,
};
