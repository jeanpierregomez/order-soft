const { Router } = require("express");
const router = Router();
const passport = require("passport");
const LoginController = require('../controllers/LoginController');

router.route("/").post(
	passport.authenticate("local-signin", {
		successRedirect: "/",
		failureRedirect: "/",
		passReqToCallback: true,
	})
);
router.route("/supervisor").get(LoginController.loginSupervisor).post(
	passport.authenticate("supervisor-signin", {
		successRedirect: "/",
		failureRedirect: "/",
		passReqToCallback: true,
	})
);
router.route("/signup").post(
	passport.authenticate("local-signup", {
		successRedirect: "/",
		failureRedirect: "/",
		passReqToCallback: true,
	})
);

module.exports = router;
