const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo nombre no puede estar vacío"
                },
                notNull:{
                    msg: "El campo nombre no puede estar vacío"
                }
            }
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'payment_methods',
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
        ]
    });

    PaymentMethod.associate = function(models){
        PaymentMethod.hasMany(models.Repayment, { as: "repayment", foreignKey: "paymentmethodId"});
        PaymentMethod.hasMany(models.SaleError, { as: "sale_issues", foreignKey: "paymentmethodId"});
        PaymentMethod.hasMany(models.Sale, { as: "sales", foreignKey: "paymentmethodId"});
    };

    return PaymentMethod ;
};
