'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('properties');

    const columnsToAdd = [
      { name: 'pricePerSqft', type: Sequelize.BIGINT, allowNull: true },
      { name: 'listingPurpose', type: Sequelize.STRING, allowNull: false, defaultValue: 'buy' },
      { name: 'floor', type: Sequelize.INTEGER, allowNull: true },
      { name: 'totalFloors', type: Sequelize.INTEGER, allowNull: true },
      { name: 'parking', type: Sequelize.STRING, allowNull: true },
      { name: 'furnishing', type: Sequelize.STRING, allowNull: true },
      { name: 'locality', type: Sequelize.STRING, allowNull: true },
      { name: 'state', type: Sequelize.STRING, allowNull: false, defaultValue: 'Maharashtra' },
      { name: 'pincode', type: Sequelize.STRING, allowNull: true },
      { name: 'latitude', type: Sequelize.DOUBLE, allowNull: true },
      { name: 'longitude', type: Sequelize.DOUBLE, allowNull: true },
      { name: 'agencyId', type: Sequelize.INTEGER, allowNull: true },
      { name: 'developer', type: Sequelize.STRING, allowNull: true },
      { name: 'projectId', type: Sequelize.STRING, allowNull: true },
      { name: 'reraNumber', type: Sequelize.STRING, allowNull: true },
      { name: 'reraStatus', type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
      { name: 'reraAuthority', type: Sequelize.STRING, allowNull: true },
      { name: 'reraRegistrationUrl', type: Sequelize.STRING, allowNull: true },
      { name: 'reraVerifiedAt', type: Sequelize.DATE, allowNull: true },
      { name: 'constructionStatus', type: Sequelize.STRING, allowNull: false, defaultValue: 'ready_to_move' },
      { name: 'possessionStatus', type: Sequelize.STRING, allowNull: true },
      { name: 'addressScore', type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      { name: 'scoreBreakdown', type: Sequelize.TEXT, allowNull: true },
      { name: 'verifiedBadges', type: Sequelize.TEXT, allowNull: true },
    ];

    for (const col of columnsToAdd) {
      if (!tableInfo[col.name]) {
        await queryInterface.addColumn('properties', col.name, {
          type: col.type,
          allowNull: col.allowNull,
          defaultValue: col.defaultValue,
        });
      }
    }

    // Safe deterministic backfill on existing rows without touching coordinates or market metrics
    try {
      await queryInterface.sequelize.query(`
        UPDATE properties 
        SET 
          "listingPurpose" = COALESCE("listingPurpose", 'buy'),
          "reraStatus" = COALESCE("reraStatus", 'pending'),
          "constructionStatus" = COALESCE("constructionStatus", 'ready_to_move'),
          "addressScore" = COALESCE("addressScore", 0),
          "state" = COALESCE("state", 'Maharashtra')
        WHERE "listingPurpose" IS NULL 
           OR "reraStatus" IS NULL 
           OR "constructionStatus" IS NULL 
           OR "addressScore" IS NULL 
           OR "state" IS NULL;
      `);
    } catch (backfillErr) {
      console.warn("Backfill warning (may be empty table or SQLite syntax fallback):", backfillErr.message);
    }

    // Indexes
    try {
      await queryInterface.addIndex('properties', ['locality'], { name: 'properties_locality_idx' });
    } catch (e) {}
    try {
      await queryInterface.addIndex('properties', ['listingPurpose'], { name: 'properties_listing_purpose_idx' });
    } catch (e) {}
    try {
      await queryInterface.addIndex('properties', ['reraStatus'], { name: 'properties_rera_status_idx' });
    } catch (e) {}
    try {
      await queryInterface.addIndex('properties', ['constructionStatus'], { name: 'properties_construction_status_idx' });
    } catch (e) {}
    try {
      await queryInterface.addIndex('properties', ['latitude', 'longitude'], { name: 'properties_lat_lng_idx' });
    } catch (e) {}
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('properties');
    const columnsToRemove = [
      'pricePerSqft',
      'listingPurpose',
      'floor',
      'totalFloors',
      'parking',
      'furnishing',
      'locality',
      'state',
      'pincode',
      'latitude',
      'longitude',
      'agencyId',
      'developer',
      'projectId',
      'reraNumber',
      'reraStatus',
      'reraAuthority',
      'reraRegistrationUrl',
      'reraVerifiedAt',
      'constructionStatus',
      'possessionStatus',
      'addressScore',
      'scoreBreakdown',
      'verifiedBadges',
    ];

    for (const col of columnsToRemove) {
      if (tableInfo[col]) {
        await queryInterface.removeColumn('properties', col);
      }
    }
  }
};
