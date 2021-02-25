const { Router } = require("express");
const ProductoController = require("../controllers/ProductoController");
const router = Router();

router.route("/search").get(ProductoController.viewListaProductos);

module.exports = router;
