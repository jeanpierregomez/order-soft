const { Router } = require("express");
const IsAdmin = require("../middelwares/IsAdmin");
const router = Router();

router.use(IsAdmin);

module.exports = router;
