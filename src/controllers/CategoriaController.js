const { Categoria } = require("../repository/database/index").models;

module.exports = {
    create: async (categoria) => {
        const categoriaDB = await Categoria.create({ nombre: categoria.nombre});
        return categoriaDB;
    },
    getCategorias: async () => await Categoria.findAll(),
};
