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
			id_rol: 1,
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
};
