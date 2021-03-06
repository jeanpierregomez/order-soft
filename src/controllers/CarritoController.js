const { Carrito } = require("../repository/database/index").models;

module.exports = {
	create: async (id_cliente) => {
		const carritoDB = await Carrito.create({ id_cliente, valor_total: 0 });
		return carritoDB ? true : false;
	},
};
