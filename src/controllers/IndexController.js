module.exports = {
	viewIndex: (req, res) => {
		res.render("index", {
			user: req.user,
		});
	},
};
