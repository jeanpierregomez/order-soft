const { Router } = require("express");
const ProductoController = require("../controllers/ProductoController");
const router = Router();

router.route("/search/:id").get(ProductoController.viewProductosByCategoria);
router.route("/search").get(ProductoController.viewProductosBySearch);

module.exports = router;
