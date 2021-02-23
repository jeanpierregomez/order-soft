const Producto = require("../repository/models/Producto");

module.exports = {
    create: async (producto) => {
        const productoDB = await Producto.create({
            ...producto,
            id_estado: process.env.PRODUCTO_REVISION,
        });
        return productoDB ? productoDB : false;
    },
    getProductosE1: async () =>
        await Producto.findAll({
            where: { id_estado: process.env.PRODUCTO_REVISION },
        }),
};
