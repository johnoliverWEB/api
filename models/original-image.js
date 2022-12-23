const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('OriginalImage', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo path no puede estar vacío"
                },
                notNull:{
                    msg: "El campo path no puede estar vacío"
                }
            }
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
        entityId: {
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
        languageAlias: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo alias de lenguaje (ESP, ENG) no puede estar vacío"
                },
                notNull:{
                    msg: "El campo alias de lenguaje (ESP, ENG) no puede estar vacío"
                }
            }
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Necesitas darle un nombre al archivo"
                },
                notNull:{
                    msg: "Necesitas darle un nombre al archivo"
                }
            }
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo contenido no puede estar vacío"
                },
                notNull:{
                    msg: "El campo contenido no puede estar vacío"
                }
            }
        },
        mimetype: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo mimetype no puede estar vacío"
                },
                notNull:{
                    msg: "El campo mimetype no puede estar vacío"
                }
            }
        },
        sizeBytes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo size bytes no puede estar vacío"
                },
                notNull:{
                    msg: "El campo size bytes no puede estar vacío"
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
        }
    }, {
        sequelize,
        tableName: 'original_images',
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
