const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('books', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        pageCount: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        publishedDate:{
            type: DataTypes.DATEONLY,
            allowNull:true,
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull:false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    });
};
