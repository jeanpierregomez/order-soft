const { Router } = require("express");
const ProductoController = require("../controllers/ProductoController");
const router = Router();

router
    .route("/search/:id")
    .get(ProductoController.viewProductosByCategoria)
    .post(ProductoController.getProductosByCategoria);
router
    .route("/search")
    .get(ProductoController.viewProductosBySearch)
    .post(ProductoController.getProductosBySearch);

module.exports = router;
