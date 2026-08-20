'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('properties');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('properties', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        price: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Mumbai',
        },
        address: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        propertyType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Apartment',
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'For Sale',
        },
        bedrooms: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        bathrooms: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        area: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        amenities: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        images: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        agentId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
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

      await queryInterface.addIndex('properties', ['ownerId']);
      await queryInterface.addIndex('properties', ['agentId']);
      await queryInterface.addIndex('properties', ['city']);
      await queryInterface.addIndex('properties', ['status']);
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('properties');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (tableExists) {
      await queryInterface.dropTable('properties');
    }
  },
};
