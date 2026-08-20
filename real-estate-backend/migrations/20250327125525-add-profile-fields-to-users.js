'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('users');

    if (!tableInfo.firstName) {
      await queryInterface.addColumn('users', 'firstName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableInfo.lastName) {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableInfo.phoneNumber) {
      await queryInterface.addColumn('users', 'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableInfo.about) {
      await queryInterface.addColumn('users', 'about', {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('users');
    if (tableInfo.firstName) await queryInterface.removeColumn('users', 'firstName');
    if (tableInfo.lastName) await queryInterface.removeColumn('users', 'lastName');
    if (tableInfo.phoneNumber) await queryInterface.removeColumn('users', 'phoneNumber');
    if (tableInfo.about) await queryInterface.removeColumn('users', 'about');
  }
};
