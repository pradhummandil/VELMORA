'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('commute_routes_cache');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('commute_routes_cache', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        originHash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        destinationHash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        originAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        destinationAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        distanceKm: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        durationMinutes: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        transitMode: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'driving',
        },
        cachedUntil: {
          type: Sequelize.DATE,
          allowNull: false,
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
        await queryInterface.addIndex('commute_routes_cache', ['originHash'], { name: 'commute_cache_origin_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('commute_routes_cache', ['destinationHash'], { name: 'commute_cache_destination_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('commute_routes_cache', ['cachedUntil'], { name: 'commute_cache_expiry_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('commute_routes_cache');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('commute_routes_cache');
    }
  }
};
