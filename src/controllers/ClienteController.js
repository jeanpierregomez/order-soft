const { Cliente } = require("../repository/database/index").models;
const UsuarioController = require("../controllers/UsuarioController");

module.exports = {
	create: async (req) => {
		const {
			email,
			contrasena,
			documento,
			nombres,
			apellidos,
			telefono,
			direccion,
		} = req.body;
		const userDB = await UsuarioController.create({
			email,
			contrasena,
			id_rol: 1,
		});
		if (userDB) {
			const clienteDB = await Cliente.create({
				id: userDB.id,
				documento,
				nombres,
				apellidos,
				telefono,
				direccion,
			});
			if (clienteDB) return clienteDB;
			return false;
		}
	},
};
