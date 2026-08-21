'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Create rera_verification_audits table
    let auditTableExists = false;
    try {
      await queryInterface.describeTable('rera_verification_audits');
      auditTableExists = true;
    } catch (e) {
      auditTableExists = false;
    }

    if (!auditTableExists) {
      await queryInterface.createTable('rera_verification_audits', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'properties',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        previousStatus: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        newStatus: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        adminId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        authority: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        officialUrl: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        verificationMethod: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'manual_admin_review',
        },
        notes: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        verifiedAt: {
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
        await queryInterface.addIndex('rera_verification_audits', ['propertyId'], { name: 'rera_audits_property_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('rera_verification_audits', ['adminId'], { name: 'rera_audits_admin_idx' });
      } catch (e) {}
    }

    // 2. Create rera_reports table
    let reportTableExists = false;
    try {
      await queryInterface.describeTable('rera_reports');
      reportTableExists = true;
    } catch (e) {
      reportTableExists = false;
    }

    if (!reportTableExists) {
      await queryInterface.createTable('rera_reports', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        propertyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'properties',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        reporterName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        reporterEmail: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        issueType: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'incorrect_rera_number',
        },
        details: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'pending_review',
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
        await queryInterface.addIndex('rera_reports', ['propertyId'], { name: 'rera_reports_property_idx' });
      } catch (e) {}
      try {
        await queryInterface.addIndex('rera_reports', ['status'], { name: 'rera_reports_status_idx' });
      } catch (e) {}
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('rera_reports');
    } catch (e) {}
    try {
      await queryInterface.dropTable('rera_verification_audits');
    } catch (e) {}
  }
};
