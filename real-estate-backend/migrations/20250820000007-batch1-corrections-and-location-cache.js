'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Data Correction: Make state nullable on properties and remove hardcoded default
    try {
      await queryInterface.changeColumn('properties', 'state', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      });
    } catch (e) {
      console.warn("Notice: properties.state changeColumn handled:", e.message);
    }

    // 2. Create location_cache table for caching geocoding & place normalization queries
    let tableExists = false;
    try {
      await queryInterface.describeTable('location_cache');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('location_cache', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        queryKey: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'google',
        },
        formattedAddress: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        placeId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        locality: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        district: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        country: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'India',
        },
        pincode: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        rawComponents: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        expiresAt: {
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
        await queryInterface.addIndex('location_cache', ['queryKey'], { unique: true, name: 'location_cache_query_unique' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('location_cache', ['placeId'], { name: 'location_cache_place_id_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('location_cache', ['expiresAt'], { name: 'location_cache_expires_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('location_cache');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('location_cache');
    }
  }
};
