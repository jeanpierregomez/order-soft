const CategoriaController = require("../controllers/CategoriaController");
const UsuarioController = require("../controllers/UsuarioController");
const Categoria = require("../repository/models/Categoria");
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
	createCategoria: async (req, res) => {
		const categoria = await CategoriaController.create(req.body);
		if (categoria) {
			req.flash("success", `Categoría ${categoria.nombre} creada correctamente`);
		} else {
			req.flash("error", `Ha ocurrido un error al crear la categoría ${categoria.nombre}`);		}
		return res.redirect("/administrador/categorias");
	}, 	
	viewCategorias: async(req, res)=>{
		const categorias = await CategoriaController.getCategorias();
		res.render('administrador/admin-categorias', {categorias});
	},
	viewCreateProducto: (req, res)=>{
		res.render('administrador/nuevo-producto');
	},
};
