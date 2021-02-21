const { Router } = require("express");
const AdministradorController = require("../controllers/AdministradorController");
const IsAdmin = require("../middelwares/IsAdmin");
const upload = require("../services/uploadImage");
const router = Router();

router.route("/create/:secret/:email").get(AdministradorController.create);

router.use(IsAdmin);
router
	.route("/actualizar-categoria")
	.post(AdministradorController.updateCategoria);
router.route("/categorias").get(AdministradorController.viewCategorias);
router.route("/categorias").post(AdministradorController.createCategoria);
router.route("/eliminar-categoria").post(AdministradorController.deleteCategoria);
router.route("/productos").get(AdministradorController.viewProductos);
router
	.route("/nuevo-producto")
	.get(AdministradorController.viewCreateProducto)
	.post(upload.single("image"), AdministradorController.crearProducto);
module.exports = router;
