const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImagesConfiguration', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        entity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        directory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        grid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content_accepted: {
            type: DataTypes.STRING,
            allowNull: false
        },
        extension_conversion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width_px: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height_px: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quality: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'images-configuration',
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
