const { Usuario } = require("../repository/database/index").models;

module.exports = {
	create: async ({ email, contrasena, id_rol }) => {
		const userDB = await Usuario.create({
			email,
			contrasena: Usuario.encryptPassword(password),
			id_rol,
		});
		if (userDB) return userDB;
		return false;
	},
};
