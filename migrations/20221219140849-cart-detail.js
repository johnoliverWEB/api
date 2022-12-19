'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('cart_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId:{
        type: Sequelize.INTEGER,
        references: { 
              model: 'carts', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL',
      },
      productId:{
        type: Sequelize.INTEGER, 
        references: { 
              model: 'products', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      taxId:{
        type: Sequelize.INTEGER, 
        references: { 
              model: 'taxes', 
              key: 'id' 
        }, 
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL' 
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unitOfMeasurement: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
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
   
    await queryInterface.dropTable('cart_details');
  }
};