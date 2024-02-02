'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert("users", [{
    username: 'majindesu',
    password: 'password',
    firstName: 'majin',
    lastName: 'sakuya',
    email:'majindesu@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});


  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {})
  }
};
