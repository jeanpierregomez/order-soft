const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("order-soft-db", "root", "", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

(async () => {
	await sequelize.sync();
	console.log("database connected");
})();
