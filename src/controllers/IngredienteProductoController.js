const { IngredienteProducto } = require("../repository/database/index").models;

module.exports = {
    create: async (id_producto, ingredientes) => {
        const ingredienteProducto = ingredientes.map((item) => {
            return { id_producto, id_ingrediente: item, extra: false };
        });
        await IngredienteProducto.bulkCreate(ingredienteProductoDB);
        return ingredienteProducto ? true : false;
    },
};
