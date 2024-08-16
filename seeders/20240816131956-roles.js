"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        id: 1,
        name: "Student",
      },
      {
        id: 2,
        name: "Teacher",
      },
      {
        id: 3,
        name: "Staff",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles");
  },
};
