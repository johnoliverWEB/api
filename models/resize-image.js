const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ResizeImage', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        originalImageId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sales',
                key: 'id'
            }
        },
        imageConfigurationId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Debes introducir un título a la imagen"
                },
                notNull:{
                    msg: "Debes introducir un título a la imagen"
                }
            }
        },
        alt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo alt no puede estar vacío"
                },
                notNull:{
                    msg: "El campo alt no puede estar vacío"
                }
            }
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
                    msg: "El campo alias de lenguaje no puede estar vacío"
                },
                notNull:{
                    msg: "El campo alias de lenguaje no puede estar vacío"
                }
            }
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo nombre de archivo no puede estar vacío"
                },
                notNull:{
                    msg: "El campo nombre de archivo no puede estar vacío"
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
        mimeType: {
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
                isNumeric: true,
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
                isNumeric: true,
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
        tableName: 'resize_images',
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
                name: "originalImageId",
                using: "BTREE",
                fields: [
                    { name: "originalImageId" },
                ]
            },
            {
                name: "imageConfigurationId",
                using: "BTREE",
                fields: [
                    { name: "imageConfigurationId" },
                ]
            },
        ]
    });
};
