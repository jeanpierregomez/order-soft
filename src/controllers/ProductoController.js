const Producto = require("../repository/models/Producto");

module.exports = {
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
	getProductosE1: async () =>
		await Producto.findAll({
			where: { id_estado: process.env.PRODUCTO_REVISION },
		}),
};
