const UsuarioController = require("../controllers/UsuarioController");
module.exports = {
	create: async (req, res) => {
		const { secret, email } = req.params;
		if (secret == process.env.SECRET_ADMIN) {
			await UsuarioController.create({
				email,
				contrasena: process.env.PASS_ADMIN,
				id_rol: process.env.ROL_ADMIN,
			});
		}
		return res.redirect("/");
	},
	viewCreateProducto: (req, res)=>{
		res.render('administrador/nuevo-producto');
	},
};
