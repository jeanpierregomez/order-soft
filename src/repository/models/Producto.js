const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Categoria = require("./Categoria");
const EstadoProducto = require("./EstadoProducto");

const Producto = sequelize.define(
	"productos",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		imagen: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		nombre: {
			type: DataTypes.STRING(80),
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.STRING(300),
			allowNull: false,
		},
		id_categoria: {
			type: DataTypes.INTEGER,
			references: {
				model: Categoria,
				key: "id",
			},
		},
		precio: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		id_estado: {
			type: DataTypes.INTEGER,
			references: {
				model: EstadoProducto,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Producto;
