'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      organizer_id: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATE
      },
      publish_location_id: {
        type: Sequelize.INTEGER
      },
      admin_channel_id: {
        type: Sequelize.INTEGER
      },
      parent_channel_id: {
        type: Sequelize.INTEGER
      },
      game_mode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tournaments');
  }
};