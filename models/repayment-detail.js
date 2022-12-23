const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RepaymentDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        repaymentId: {
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
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "El campo cantidad no puede estar vacío"
                },
                notNull:{
                    msg: "El campo cantidad no puede estar vacío"
                }
            }
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "Debes incluir un precio"
                },
                notNull:{
                    msg: "Debes incluir un precio"
                }
            }
        },
        unitMeasure: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Debes incluir una unidad de medida (gr. uds.)"
                },
                notNull:{
                    msg: "Debes incluir una unidad de medida (gr. uds.)"
                }
            }
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Debes darle un nombre al producto"
                },
                notNull:{
                    msg: "Debes darle un nombre al producto"
                }
            }
        },
        taxType: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Rellena el campo tipo de IVA"
                },
                notNull:{
                    msg: "Rellena el campo tipo de IVA"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'repayment_details',
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
                name: "repaymentId",
                using: "BTREE",
                fields: [
                    { name: "repaymentId" },
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
