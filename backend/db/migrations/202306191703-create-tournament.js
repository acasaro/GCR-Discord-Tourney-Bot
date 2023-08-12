'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      organizer_id: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.STRING,
      },
      timestamp: {
        type: Sequelize.STRING,
      },
      publish_channel_id: {
        type: Sequelize.STRING,
      },
      teams_channel_id: {
        type: Sequelize.STRING,
      },
      admin_channel_id: {
        type: Sequelize.STRING,
      },
      lobby_channel_id: {
        type: Sequelize.STRING,
      },
      checkin_channel_id: {
        type: Sequelize.STRING,
      },
      checkin_message_id: {
        type: Sequelize.STRING,
      },
      parent_channel_id: {
        type: Sequelize.STRING,
      },
      game_mode: {
        type: Sequelize.STRING,
      },
      admin_message_id: {
        type: Sequelize.STRING,
      },
      publish_message_id: {
        type: Sequelize.STRING,
      },
      teams_created_message_id: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      invited_roles: {
        type: Sequelize.STRING,
      },
      checkin_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tournaments');
  },
};
