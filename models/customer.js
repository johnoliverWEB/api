const Sequelize = require('sequelize');
const emailValidator = require('deep-email-validator')

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Customer', {
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
        surname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo apellido no puede estar vacío"
                },
                notNull:{
                    msg: "El campo apellido no puede estar vacío"
                }
            }
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isNumeric: true,
                notEmpty:{
                    msg: "El campo teléfono debe contener números"
                },
                notNull:{
                    msg: "El campo teléfono debe contener números"
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty:{
                    msg: "El campo email debe contener una dirección válida"
                },
                notNull:{
                    msg: "El campo email debe contener una dirección válida"
                },
                customValidator(value) {
                    return emailValidator.validate(value).then((data) => {
                        console.log(data);
                        if(data.valid == false){
                            throw new Error("Compruebe que ha escrito su email correctamente");
                        }
                    })
                }
            }
    
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                notEmpty:{
                    msg: "El campo dirección no puede estar vacío"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'customers',
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
