const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Tax', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "Debe ser un número"
                },
                notEmpty:{
                    msg: "El campo tipo no puede estar vacío"
                },
                notNull:{
                    msg: "El campo tipo no puede estar vacío"
                }
            }
        },
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'taxes',
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
};
