'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('price_trends');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }

    if (!tableExists) {
      await queryInterface.createTable('price_trends', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        localityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'localities',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quarter: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        avgPriceSqft: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        rentalRangeMin: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        rentalRangeMax: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        source: {
          type: Sequelize.STRING,
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
        await queryInterface.addIndex('price_trends', ['localityId'], { name: 'price_trends_locality_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('price_trends', ['year', 'quarter'], { name: 'price_trends_year_quarter_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    let tableExists = false;
    try {
      await queryInterface.describeTable('price_trends');
      tableExists = true;
    } catch (e) {
      tableExists = false;
    }
    if (tableExists) {
      await queryInterface.dropTable('price_trends');
    }
  }
};
