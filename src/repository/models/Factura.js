const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Cliente = require("./Cliente");
const EstadoFactura = require("./Producto");

const Factura = sequelize.define(
    "facturas",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            references: {
                model: Cliente,
                key: "id",
            },
        },
        estadoFactura: {
            type: DataTypes.INTEGER,
            references: {
                model: EstadoFactura,
                key: "id",
            },
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        } 
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Factura;
