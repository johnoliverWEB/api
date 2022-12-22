const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Sale', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'carts',
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
                    msg: "El campo referencia no puede estar vacío"
                },
                notNull:{
                    msg: "El campo referencia no puede estar vacío"
                }
            }
        },
        totalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo precio total no puede estar vacío"
                },
                notNull:{
                    msg: "El campo precio total no puede estar vacío"
                }
            }
        },
        baseTotalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Tienes que introducir el precio total base"
                },
                notNull:{
                    msg: "El campo precio total base no puede estar vacío"
                }
            }
        },
        taxesTotalPrice: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Tienes que introducir el precio total IVA"
                },
                notNull:{
                    msg: "El campo precio total IVA no puede estar vacío"
                }
            }
        },
        emisionDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

        },
        emisionHour: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'sales',
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
                name: "cartId",
                using: "BTREE",
                fields: [
                    { name: "cartId" },
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
