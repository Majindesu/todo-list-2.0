'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("tasks", [{
      group_id: 2,
      user_id: 1,
      title: "Sample Task",
      description: "Seeded Sample Task",
      urgency: "High",
      isComplete: false,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
