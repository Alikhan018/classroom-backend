"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", [
      {
        id: 1,
        name: "Create",
        entityType: "Students",
      },
      {
        id: 2,
        name: "Read",
        entityType: "Students",
      },
      {
        id: 3,
        name: "Update",
        entityType: "Students",
      },
      {
        id: 4,
        name: "Delete",
        entityType: "Students",
      },
      {
        id: 5,
        name: "Create",
        entityType: "Teachers",
      },
      {
        id: 6,
        name: "Read",
        entityType: "Teachers",
      },
      {
        id: 7,
        name: "Update",
        entityType: "Teachers",
      },
      {
        id: 8,
        name: "Delete",
        entityType: "Teachers",
      },
      {
        id: 9,
        name: "All",
        entityType: "Admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Features", null, {});
  },
};
