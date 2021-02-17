const { Router } = require("express");
const router = Router();
const passport = require("passport");

router.route("/").post();
router.route("/supervisor").get().post();
router.route("/signup").post(
	passport.authenticate("local-signup", {
		successRedirect: "/",
		failureRedirect: "/login",
		passReqToCallback: true,
	})
);

module.exports = router;
