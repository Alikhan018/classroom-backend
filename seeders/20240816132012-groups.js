"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Groups", [
      {
        id: 1,
        name: "Students",
      },
      {
        id: 2,
        name: "Teachers",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Groups");
  },
};
