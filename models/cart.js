const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Cart = sequelize.define('Cart', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fingerprints',
                key: 'id'
            }
        }
    }, {
        sequelize,
        tableName: 'carts',
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
            }
        ]
    });
    Cart.associate = function(models){
        Cart.hasMany(models.CartDetail, { as: "cart_details", foreignKey: "cartId"});
        Cart.hasMany(models.SaleError, { as: "sale_error", foreignKey: "cartId"});
        Cart.hasMany(models.Sale, { as: "sales", foreignKey: "cartId"});
        Cart.belongsTo(models.Customer, { as: "customer", foreignKey: "customerId"});
        Cart.belongsTo(models.Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    };

    return Cart;
};
