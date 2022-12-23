const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Repayment', {
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
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        paymentMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'payment_methods',
                key: 'id'
            }
        },
        reference: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Debes introducir una referencia"
                },
                notNull:{
                    msg: "Debes introducir una referencia"
                }
            }
        },
        totalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "Debes añadir un precio total"
                },
                notNull:{
                    msg: "Debes añadir un precio total"
                }
            }
        },
        baseTotalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "Debes añadir un precio total base"
                },
                notNull:{
                    msg: "Debes añadir un precio total base"
                }
            }
        },
        taxesTotalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "Debes añadir un precio total IVA"
                },
                notNull:{
                    msg: "Debes añadir un precio total IVA"
                }
            },
        },
        emisionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        emisionHour: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'repayments',
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
                name: "customerId",
                using: "BTREE",
                fields: [
                    { name: "customerId" },
                ]
            },
            {
                name: "paymentMethodId",
                using: "BTREE",
                fields: [
                    { name: "paymentMethodId" },
                ]
            },
        ]
    });
};
