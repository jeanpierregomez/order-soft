const { Cliente } = require("../repository/database/index").models;
const CarritoController = require("../controllers/CarritoController");
const UsuarioController = require("../controllers/UsuarioController");

module.exports = {
	create: async (req) => {
		const {
			apellidos,
			contrasena,
			direccion,
			documento,
			email,
			nombres,
			telefono,
		} = req.body;
		const userDB = await UsuarioController.create({
			contrasena,
			email,
			id_rol: process.env.ROL_CLIENTE,
		});
		if (userDB) {
			const clienteDB = await Cliente.create({
				apellidos,
				direccion,
				documento,
				id: userDB.id,
				nombres,
				telefono,
			});
			const carritoDB = clienteDB
				? await CarritoController.create(clienteDB.id)
				: null;
			return carritoDB ? userDB : null;
		}
		return null;
	},
	getById: async (id) => await Cliente.findByPk(id),
	loadDataCliente: async function (id) {
		const userDB = await UsuarioController.getById(id);
		await this.getById(userDB.id).then(
			(data) => (userDB.dataValues.cliente = data.dataValues)
		);
		return userDB;
	},
};
