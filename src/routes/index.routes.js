const { Router } = require("express");
const router = Router();
const AdministradorRoutes = require("./administrador.routes");
const IndexController = require("../controllers/IndexController");
const LoginRoutes = require("./login.routes");

router.route("/").get(IndexController.index);
router.use("/login", LoginRoutes);
router.use("/administrador", AdministradorRoutes);
module.exports = router;
