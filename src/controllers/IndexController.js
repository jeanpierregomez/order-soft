module.exports = {
	index: (req, res) => {
		res.render("index", {
			user: req.user
		});
	},
};
