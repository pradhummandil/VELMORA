'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('localities');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('localities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        state: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'Maharashtra',
        },
        pincode: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        avgPriceSqft: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        rentalYield: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        localityScore: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        connectivityScore: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        lifestyleScore: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        schoolsCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        hospitalsCount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        highlights: {
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
        await queryInterface.addIndex('localities', ['slug'], { unique: true, name: 'localities_slug_unique' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('localities', ['city'], { name: 'localities_city_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('localities', ['name'], { name: 'localities_name_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('localities', ['pincode'], { name: 'localities_pincode_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('localities');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('localities');
    }
  }
};
