const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.route("/").post(
	passport.authenticate("local-signin", {
		successRedirect: "/",
		failureRedirect: "/",
		passReqToCallback: true,
	})
);
router.route("/supervisor").get().post();
router.route("/signup").post(
	passport.authenticate("local-signup", {
		successRedirect: "/",
		failureRedirect: "/",
		passReqToCallback: true,
	})
);

module.exports = router;
