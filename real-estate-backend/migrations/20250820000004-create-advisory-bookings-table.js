'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('advisory_bookings');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('advisory_bookings', {
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
        propertyId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'properties',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        advisoryType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'talk_to_advisor',
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        budgetRange: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        timePreference: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'new',
        },
        notes: {
          type: Sequelize.TEXT,
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
        await queryInterface.addIndex('advisory_bookings', ['userId'], { name: 'advisory_bookings_user_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('advisory_bookings', ['propertyId'], { name: 'advisory_bookings_property_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('advisory_bookings', ['status'], { name: 'advisory_bookings_status_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('advisory_bookings');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('advisory_bookings');
    }
  }
};
