"use strict";

const { isEntityName } = require("typescript");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EntityFeatures", [
      {
        featureId: 6,
        entityName: "Roles",
        entityId: 1,
      },
      {
        featureId: 2,
        entityName: "Roles",
        entityId: 2,
      },
      {
        featureId: 3,
        entityName: "Roles",
        entityId: 2,
      },
      {
        featureId: 9,
        entityName: "Roles",
        entityId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EntityFeatures", null, {});
  },
};
