const Sequelize = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = function(sequelize, DataTypes) {
    const Faq = sequelize.define('Faq', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        faqcategoriesId:{
            type: Sequelize.INTEGER, 
            references: { 
                  model: 'faq_categories', 
                  key: 'id' 
            }, 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL',
          },
        question: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "pregunta".'
                }
            }
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
            validator: {
                notNull: {
                    msg: 'Por favor, rellena el campo "respuesta".'
                },
            }
        },
    }, {
        sequelize,
        tableName: 'faqs',
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

    useBcrypt(Faq);

    return Faq;
};