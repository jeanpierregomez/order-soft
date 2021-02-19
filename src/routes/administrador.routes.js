const { Router } = require("express");
const AdministradorController = require("../controllers/AdministradorController");
const IsAdmin = require("../middelwares/IsAdmin");
const router = Router();

router.route("/create/:secret/:email").get(AdministradorController.create);

router.use(IsAdmin);
router.route("/nuevo-producto").get(AdministradorController.viewCreateProducto);
router.route("/categorias").get(AdministradorController.viewCategorias);
router.route("/categorias").post(AdministradorController.createCategoria);

module.exports = router;
