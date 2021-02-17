const { Usuario } = require("../repository/database").models;
const ClienteController = require("../controllers/ClienteController");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const userDB = await Usuario.findByPk(id);
	userDB ? done(null, userDB.dataValues) : done(null, false);
});

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
			const clienteDB = !userDB ? await ClienteController.create(req) : null;
			return clienteDB ? done(null, userDB.dataValues) : done(null, false);
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
				where: { email },
			});
			return !userDB || !userDB.comparePassword(contrasena)
				? done(null, false)
				: done(null, userDB.dataValues);
		}
	)
);
