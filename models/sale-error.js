const Sequelize = require('sequelize');
const saleDetail = require('./sale-detail');
module.exports = function(sequelize, DataTypes) {
    const SaleError = sequelize.define('SaleError', {
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
    SaleError.associate = function(models){
        SaleError.belongsTo(models.Cart, { as: "cart", foreignKey: "cartId"});
        SaleError.belongsTo(models.Customer, { as: "customer", foreignKey: "customerId"});
        SaleError.belongsTo(models.PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    };

    return SaleError;
};
