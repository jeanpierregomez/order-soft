const { Router } = require("express");
const AdministradorController = require("../controllers/AdministradorController");
const IsAdmin = require("../middelwares/IsAdmin");
const router = Router();

router.route("/create/:secret/:email").get(AdministradorController.create);

router.use(IsAdmin);

module.exports = router;
