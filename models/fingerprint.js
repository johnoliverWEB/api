const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Fingerprint = sequelize.define('Fingerprint', {
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
        fingerprint: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo fingerprint no puede estar vacío"
                },
                notNull:{
                    msg: "El campo fingerprint no puede estar vacío"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'fingerprints',
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
        ]
    });

    Fingerprint.associate = function(models){
        Fingerprint.belongsTo(models.Customer, { as: "customer", foreignKey: "customerId"});
        Fingerprint.hasMany(models.Cart, { as: "carts", foreignKey: "fingerprintId"});
        Fingerprint.hasMany(models.Contact, { as: "contacts", foreignKey: "fingerprintId"});
    };

    return Fingerprint;
};
