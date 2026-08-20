'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('saved_searches');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('saved_searches', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        criteria: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        alertEnabled: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        frequency: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'daily',
        },
        lastNotifiedAt: {
          type: Sequelize.DATE,
          allowNull: true,
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

      try {
        await queryInterface.addIndex('saved_searches', ['userId'], { name: 'saved_searches_user_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('saved_searches', ['alertEnabled'], { name: 'saved_searches_alert_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('saved_searches');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('saved_searches');
    }
  }
};
