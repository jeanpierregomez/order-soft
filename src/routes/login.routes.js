const { Router } = require("express");
const router = Router();
const LoginController = require("../controllers/LoginController");

router.route("/").post();
router.route("/supervisor").get().post();
router.route("/signup").get().post();

module.exports = router;
