const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleError', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        paymentmethodsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'payment_methods',
                key: 'id'
            }
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'carts',
                key: 'id'
            }
        },
        errorCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo Error Code no puede estar vacío"
                },
                notNull:{
                    msg: "El campo Error Code no puede estar vacío"
                }
            }
        },
        errorMessage: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Debes añadir un mensaje de error"
                },
                notNull:{
                    msg: "Debes añadir un mensaje de error"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'sale_errors',
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
                name: "paymentmethodsId",
                using: "BTREE",
                fields: [
                    { name: "paymentmethodsId" },
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
                name: "cartId",
                using: "BTREE",
                fields: [
                    { name: "cartId" },
                ]
            },
        ]
    });
};
