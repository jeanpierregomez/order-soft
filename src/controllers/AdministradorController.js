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
			req.flash("error", `Ha ocurrido un error al crear la categoría ${categoria.nombre}`);		
		}
		return res.redirect("/administrador/categorias");
	}, 	
	deleteCategoria: async (req, res) => {
		const { id } = req.body;
		const categoria = await CategoriaController.delete(id);
		if (categoria) {
			req.flash("success", `Se ha eliminado correctamente la categoría ${categoria.nombre}!`);
		} else {
			req.flash("error", `La categoría que ha intentado eliminar no  existe!`);
		}
		return res.redirect("/administrador/categorias");
	},
	updateCategoria: async (req, res) => {
		const categoria = await CategoriaController.update(req.body);
		if (categoria) {
			req.flash("success", `Categoría ${categoria.nombre} actualizada correctamente`);
		} else {
			req.flash("error", `Ha ocurrido un error al actualizar la categoría ${categoria.nombre}`);		
		}
		return res.redirect("/administrador/categorias");
	},	
	viewCategorias: async(req, res)=>{
		const categorias = await CategoriaController.getCategorias();
		res.render('administrador/admin-categorias', {categorias});
	},
	viewCreateProducto: async (req, res)=>{
		const categorias = await CategoriaController.getCategorias();
		res.render('administrador/nuevo-producto', {categorias});
	},
	viewProductos: (req, res) => {
		res.render('administrador/admin-productos');
	},
};
