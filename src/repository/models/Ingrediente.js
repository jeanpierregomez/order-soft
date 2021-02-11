const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Producto = require("./Producto");

const Ingrediente = sequelize.define(
    "ingredientes",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        stock: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        } 
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Ingrediente;
