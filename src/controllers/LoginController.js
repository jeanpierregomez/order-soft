module.exports = {
	loginSupervisor: (req, res) => {
		res.render("administrador/admin-login");
	},
	logout: (req, res) => {
		req.logout();
		res.redirect("/");
	},
};
