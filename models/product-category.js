const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const ProductCategory = sequelize.define('ProductCategory', {
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'product_categories',
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

    ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product, { as: "products", foreignKey: "categoryId"});
    };

    return ProductCategory;
};
