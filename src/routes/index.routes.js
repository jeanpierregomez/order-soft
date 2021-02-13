const { Router } = require("express");
const router = Router();
const LoginRoutes = require("./login.routes");
const IndexController = require("../controllers/IndexController");

router.route("/").get(IndexController.index);
router.use("/login", LoginRoutes);
module.exports = router;
