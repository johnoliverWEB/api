const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const CartDetail = sequelize.define('CartDetail', {
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
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        taxId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'taxes',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        unitOfMeasurement: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'cart_details',
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
                name: "productId",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
            {
                name: "taxId",
                using: "BTREE",
                fields: [
                    { name: "taxId" },
                ]
            },

        ]
    });

    CartDetail.associate = function(models) {
        CartDetail.belongsTo(models.Cart, { as: "cart", foreignKey: "cartId"});
        CartDetail.belongsTo(models.Product, { as: "product", foreignKey: "productId"});
    };

    return CartDetail;
};
