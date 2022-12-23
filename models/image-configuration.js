const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageConfiguration', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo entity no puede estar vacío"
                },
                notNull:{
                    msg: "El campo entity no puede estar vacío"
                }
            }
        },
        directory: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo entityId no puede estar vacío"
                },
                notNull:{
                    msg: "El campo entityId no puede estar vacío"
                }
            }
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo type no puede estar vacío"
                },
                notNull:{
                    msg: "El campo type no puede estar vacío"
                }
            }
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo content no puede estar vacío"
                },
                notNull:{
                    msg: "El campo content no puede estar vacío"
                }
            }
        },
        grid: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo grid no puede estar vacío"
                },
                notNull:{
                    msg: "El campo grid no puede estar vacío"
                }
            }
        },
        contentAccepted: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo content accepted no puede estar vacío"
                },
                notNull:{
                    msg: "El campo content accepted no puede estar vacío"
                }
            }
        },
        extensionConversion: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo extension conversion no puede estar vacío"
                },
                notNull:{
                    msg: "El campo extension conversion no puede estar vacío"
                }
            }
        },
        widthPx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo width no puede estar vacío"
                },
                notNull:{
                    msg: "El campo width no puede estar vacío"
                }
            }
        },
        heightPx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo height no puede estar vacío"
                },
                notNull:{
                    msg: "El campo height no puede estar vacío"
                }
            }
        },
        quality: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo calidad no puede estar vacío"
                },
                notNull:{
                    msg: "El campo calidad no puede estar vacío"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'image_configurations',
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
