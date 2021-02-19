const { Router } = require("express");
const AdministradorRoutes = require("./administrador.routes");
const IndexController = require("../controllers/IndexController");
const LoginRoutes = require("./login.routes");
const router = Router();

router.route("/").get(IndexController.index);
router.use("/login", LoginRoutes);
router.use("/administrador", AdministradorRoutes);
module.exports = router;
