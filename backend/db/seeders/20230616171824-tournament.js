"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tournament",
      [
        {
          title: "Test Tournament",
          description: "Some description here",
          organizer_id: "538954894506197002",
          publish_location_id: "1119033751440195695",
          startDate: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
