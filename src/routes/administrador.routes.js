const { Router } = require("express");
const AdministradorController = require("../controllers/AdministradorController");
const IsAdmin = require("../middelwares/IsAdmin");
const upload = require("../services/uploadImage");
const router = Router();

router.route("/create/:secret/:email").get(AdministradorController.create);

router.use(IsAdmin);

router.route("/aprobar-producto").post(AdministradorController.aprobarProducto);

router
	.route("/actualizar-categoria")
	.post(AdministradorController.updateCategoria);

router
	.route("/actualizar-ingrediente")
	.post(AdministradorController.updateIngrediente);

router
	.route("/actualizar-producto")
	.get(AdministradorController.viewUpdateProducto)
	.post(AdministradorController.updateProducto);

router
	.route("/agregar-ingredientes")
	.post(AdministradorController.setProductoIngrediente);

router
	.route("/agregar-ingredientes/:id")
	.get(AdministradorController.viewProductoIngredienteAgg);

router.route("/categorias").get(AdministradorController.viewCategorias);

router.route("/categorias").post(AdministradorController.createCategoria);

router
	.route("/eliminar-categoria")
	.post(AdministradorController.deleteCategoria);

router
	.route("/eliminar-ingrediente")
	.post(AdministradorController.deleteIngrediente);

router
	.route("/eliminar-ingredientes")
	.post(AdministradorController.deleteProductoIngrediente);

router
	.route("/eliminar-ingredientes/:id")
	.get(AdministradorController.viewProductoIngredienteDelete);

router.route("/eliminar-producto").post(AdministradorController.deleteProducto);

router.route("/ingredientes").get(AdministradorController.viewIngredientes);
router.route("/ingredientes").post(AdministradorController.createIngrediente);
router.route("/productos").get(AdministradorController.viewProductos);
router.route("/productos").post(AdministradorController.createProducto);

router
	.route("/nuevo-producto")
	.get(AdministradorController.viewCreateProducto)
	.post(upload.single("image"), AdministradorController.createProducto);
module.exports = router;
