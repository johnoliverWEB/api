const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Cart', {
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
