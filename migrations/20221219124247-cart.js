'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId:{
        type: Sequelize.INTEGER,
        references: { 
              model: 'customers', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL',
      },
      fingerprintId:{
        type: Sequelize.INTEGER, 
        references: { 
              model: 'fingerprints', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('carts');
  }
};