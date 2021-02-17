const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { Usuario } = require("../repository/database").models;
const ClienteController = require("../controllers/ClienteController");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {});

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "contrasena",
			passReqToCallback: true,
		},
		async (req, email, contrasena, done) => {
			const userDB = await Usuario.findOne({
				where: { email },
			});
			if (!userDB) {
				const clienteDB = await ClienteController.create(req);
				if (clienteDB) return done(null, clienteDB.dataValues);
			}
			return done(null, false);
		}
	)
);

passport.use(
	"local-signin",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "contrasena",
			passReqToCallback: true,
		},
		async (req, email, contrasena, done) => {
			const userDB = await Usuario.findOne({
				where: {
					email,
				},
			});
			if (!userDB) {
				return done(null, false);
			}
			if (!userDB.comparePassword(contrasena)) {
				return done(null, false);
			}
			done(null, userDB.dataValues);
		}
	)
);
