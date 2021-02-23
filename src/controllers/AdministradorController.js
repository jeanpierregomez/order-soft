const CategoriaController = require("../controllers/CategoriaController");
const EstadoProductoController = require("../controllers/EstadoProductoController");
const UsuarioController = require("../controllers/UsuarioController");
const IngredienteController = require("../controllers/IngredienteController");
const IngredienteProductoController = require("../controllers/IngredienteProductoController");
const ProductoController = require("./ProductoController");

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
			req.flash(
				"success",
				`Categoría ${categoria.nombre} creada correctamente`
			);
		} else {
			req.flash(
				"error",
				`Ha ocurrido un error al crear la categoría ${categoria.nombre}`
			);
		}
		return res.redirect("/administrador/categorias");
	},
	createIngrediente: async (req, res) => {
		const ingrediente = await IngredienteController.create(req.body);
		if (ingrediente) {
			req.flash(
				"success",
				`Ingrediente ${ingrediente.nombre} creada correctamente`
			);
		} else {
			req.flash("error", `Ha ocurrido un error al crear el ingrediente.`);
		}
		return res.redirect("/administrador/ingredientes");
	},
	createProducto: async (req, res) => {
		const { nombre, descripcion, id_categoria, precio } = req.body;
		const imagen = req.file.originalname;
		const productoDB = await ProductoController.create({
			nombre,
			descripcion,
			id_categoria,
			precio,
			imagen,
		});
		if (productoDB) {
			req.flash(
				"success",
				`Se ha creado correctamente el producto ${productoDB.nombre}`
			);
		} else {
			req.flash(
				"error",
				`Ha ocurrido un error al crear el producto ${productoDB.nombre}`
			);
		}
		return res.redirect("/administrador/nuevo-producto");
	},
	deleteCategoria: async (req, res) => {
		const { id } = req.body;
		const categoria = await CategoriaController.delete(id);
		if (categoria) {
			req.flash(
				"success",
				`Se ha eliminado correctamente la categoría ${categoria.nombre}!`
			);
		} else {
			req.flash("error", `La categoría que ha intentado eliminar no  existe!`);
		}
		return res.redirect("/administrador/categorias");
	},
	deleteIngrediente: async (req, res) => {
		const { id } = req.body;
		const ingrediente = await IngredienteController.delete(id);
		if (ingrediente) {
			req.flash(
				"success",
				`Se ha eliminado correctamente el ingrediente ${ingrediente.nombre}!`
			);
		} else {
			req.flash(
				"error",
				`EL ingrediente que ha intentado eliminar no  existe!`
			);
		}
		return res.redirect("/administrador/ingredientes");
	},
	deleteProductoIngrediente: async (req, res) => {
		const { id, ingredientes } = req.body;
		const result = await IngredienteProductoController.delete(id, ingredientes);
		res.json({ result });
	},
	updateCategoria: async (req, res) => {
		const categoria = await CategoriaController.update(req.body);
		if (categoria) {
			req.flash(
				"success",
				`Categoría ${categoria.nombre} actualizada correctamente`
			);
		} else {
			req.flash(
				"error",
				`Ha ocurrido un error al actualizar la categoría ${categoria.nombre}`
			);
		}
		return res.redirect("/administrador/categorias");
	},
	updateIngrediente: async (req, res) => {
		const ingrediente = await IngredienteController.update(req.body);
		if (ingrediente) {
			req.flash(
				"success",
				`Ingrediente ${ingrediente.nombre} actualizado correctamente`
			);
		} else {
			req.flash(
				"error",
				`Ha ocurrido un error al actualizar el ingrediente ${ingrediente.nombre}`
			);
		}
		return res.redirect("/administrador/ingredientes");
	},
	setProductoIngrediente: async (req, res) => {
		const { id, ingredientes } = req.body;
		const result = await IngredienteProductoController.create(id, ingredientes);
		res.json({ result });
	},
	viewCategorias: async (req, res) => {
		const categorias = await CategoriaController.getCategorias();
		res.render("administrador/admin-categorias", { categorias });
	},
	viewCreateProducto: async (req, res) => {
		const categorias = await CategoriaController.getCategorias();
		res.render("administrador/nuevo-producto", { categorias });
	},
	viewIngredientes: async (req, res) => {
		const ingredientes = await IngredienteController.getIngredientes();
		res.render("administrador/admin-ingredientes", { ingredientes });
	},
	viewProductos: async (req, res) => {
		const productos = await ProductoController.getProductosE1();
		if (productos) {
			productos.forEach(async (producto) => {
				const categoriaDB = await CategoriaController.getById(
					producto.id_categoria
				);
				const estadoDB = await EstadoProductoController.getById(
					producto.id_estado
				);
				producto.setDataValue("categoria", categoriaDB.getDataValue("nombre"));
				producto.setDataValue("estado", estadoDB.getDataValue("nombre"));
			});
		}
		res.render("administrador/admin-productos", { productos });
	},
	viewProductoIngredienteAgg: async (req, res) => {
		const id = req.params.id;
		const producto = await ProductoController.getById(id);
		const id_ingredientes = await IngredienteProductoController.getCheck(id);
		const ingredientes = await IngredienteController.getIngredientesNotCheck(id_ingredientes);
		res.render("administrador/admin-producto-ingrediente.hbs", {
			producto,
			ingredientes,
			accion:'agregar'
		});
	},
	viewProductoIngredienteDelete: async (req, res) => {
		const id = req.params.id;
		const producto = await ProductoController.getById(id);
		const id_ingredientes = await IngredienteProductoController.getCheck(id);
		const ingredientes = await IngredienteController.getIngredientesCheck(id_ingredientes);
		res.render("administrador/admin-producto-ingrediente.hbs", {
			producto,
			ingredientes,
			accion:'eliminar'
		});
	},
};
