const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        saleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sales',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isNumeric: true, 
                notEmpty:{
                    msg: "El campo cantidad debe contener números"
                },
                notNull:{
                    msg: "El campo cantidad debe contener números"
                }
            }
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isNumeric: true, 
                notEmpty:{
                    msg: "El campo precio debe contener números"
                },
                notNull:{
                    msg: "El campo precio debe contener números"
                }
            }
        },
        unitMeasure: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo unidad de medida (gr., uds.) no puede estar vacío"
                },
                notNull:{
                    msg: "El campo unidad de medida (gr., uds.) no puede estar vacío"
                }
            }
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo nombre de producto no puede estar vacío"
                },
                notNull:{
                    msg: "El campo nombre de producto no puede estar vacío"
                }
            }
        },
        taxType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo tipo de IVA no puede estar vacío"
                },
                notNull:{
                    msg: "El campo tipo de IVA no puede estar vacío"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'sale_details',
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
                name: "saleId",
                using: "BTREE",
                fields: [
                    { name: "saleId" },
                ]
            },
            {
                name: "productId",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
        ]
    });
};
