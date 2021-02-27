const { Op } = require("sequelize");
const CategoriaController = require("../controllers/CategoriaController");
const { findByPk } = require("../repository/models/Producto");
const Producto = require("../repository/models/Producto");

module.exports = {
	aprobar: async (producto) => {
		const productoDB = await Producto.findByPk(producto.id);
		if (productoDB) {
			productoDB.id_estado = process.env.PRODUCTO_APROBADO;
			productoDB.save();
			return producto;
		}
		return false;
	},
	create: async (producto) => {
		const productoDB = await Producto.create({
			...producto,
			id_estado: process.env.PRODUCTO_REVISION,
		});
		return productoDB ? productoDB : false;
	},
	delete: async (id) =>
		await Producto.destroy({
			where: {
				id,
				id_estado: process.env.PRODUCTO_REVISION,
			},
		}),
	getById: async (id) => await Producto.findByPk(id),
	getProductosByCategoria: async (req, res) => {
		const { categorias } = req.body;
		const productos = await Producto.findAll({
			where: {
				id_estado: process.env.PRODUCTO_APROBADO,
				id_categoria: categorias,
			},
		});
		res.json(productos);
	},
	getProductosBySearch: async (req, res) => {
		const { categorias, data } = req.body;
		const productos = await Producto.findAll({
			where: {
				id_estado: process.env.PRODUCTO_APROBADO,
				id_categoria: categorias,
				[Op.or]: [
					{ nombre: { [Op.like]: `%${data}%` } },
					{ descripcion: { [Op.like]: `%${data}%` } },
				],
			},
		});
		res.json(productos);
	},
	getProductosRevision: async () =>
		await Producto.findAll({
			where: { id_estado: process.env.PRODUCTO_REVISION },
		}),
	update: async (producto) => {
		const productoDB = await Producto.findByPk(producto.id);
		if (productoDB) {
			for (const field in producto) {
				productoDB[field] = producto[field];
			}
			return await productoDB.save();
		}
		return false;
	},
	viewProducto: async (req, res) => {
		const { id } = req.params;
		const categorias = await CategoriaController.getCategorias();
		const producto = await Producto.findByPk(id);
		res.render("producto/ver-producto", { categorias, producto });
	},
	viewProductosByCategoria: async (req, res) => {
		const id_categoria = req.params.id;
		const categorias = await CategoriaController.getCategorias();
		categorias.map((categoria) => {
			const check = id_categoria == categoria.id;
			categoria.setDataValue("check", check);
		});
		const productos = await Producto.findAll({
			where: { id_estado: process.env.PRODUCTO_APROBADO, id_categoria },
		});
		const maxPrecio = await Producto.max("precio", {
			where: { id_estado: process.env.PRODUCTO_APROBADO, id_categoria },
		});
		const minPrecio = await Producto.min("precio", {
			where: { id_estado: process.env.PRODUCTO_APROBADO, id_categoria },
		});
		res.render("producto/lista-productos", {
			categorias,
			productos,
			maxPrecio,
			minPrecio,
		});
	},
	viewProductosBySearch: async (req, res) => {
		const { data } = req.query;
		const categorias = await CategoriaController.getCategorias();
		const productos = await Producto.findAll({
			where: {
				id_estado: process.env.PRODUCTO_APROBADO,
				[Op.or]: [
					{ nombre: { [Op.like]: `%${data}%` } },
					{ descripcion: { [Op.like]: `%${data}%` } },
				],
			},
		});
		const maxPrecio = await Producto.max("precio", {
			where: {
				id_estado: process.env.PRODUCTO_APROBADO,
				[Op.or]: [
					{ nombre: { [Op.like]: `%${data}%` } },
					{ descripcion: { [Op.like]: `%${data}%` } },
				],
			},
		});
		const minPrecio = await Producto.min("precio", {
			where: {
				id_estado: process.env.PRODUCTO_APROBADO,
				[Op.or]: [
					{ nombre: { [Op.like]: `%${data}%` } },
					{ descripcion: { [Op.like]: `%${data}%` } },
				],
			},
		});
		res.render("producto/lista-productos", {
			categorias,
			productos,
			maxPrecio,
			minPrecio,
			data,
		});
	},
};
