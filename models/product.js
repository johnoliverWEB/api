const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
              notEmpty:{
                  msg: "El campo nombre no puede estar vacío"
              },
              notNull:{
                  msg: "El campo nombre no puede estar vacío"
              }
          }
          },
          price: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
              isNumeric: true,
              notEmpty:{
                  msg: "El campo precio no puede estar vacío"
              },
              notNull:{
                  msg: "El campo precio no puede estar vacío"
              }
          }
          },
          taxesId:{
            type: Sequelize.INTEGER,
            references: { 
                  model: 'taxes', 
                  key: 'id' 
            }, 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
          },
          featured: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          productcategoriesId:{
            type: Sequelize.INTEGER, 
            references: { 
                  model: 'product_categories', 
                  key: 'id' 
            }, 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: DataTypes.NOW
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE
          }
    }, {
        sequelize,
        tableName: 'products',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "customerId",
                using: "BTREE",
                fields: [
                    { name: "customerId" },
                ]
            },
            {
                name: "fingerprintId",
                using: "BTREE",
                fields: [
                    { name: "fingerprintId" },
                ]
            },
        ]
    });
};
