const { response } = require("express");
const Producto = require("../repository/models/Producto");

module.exports = {
    aprobar: async (producto) => {
        const productoDB = await Producto.findByPk(producto.id);
        if (productoDB) {
            productoDB.id_estado = process.env.PRODUCTO_APROBADO;
            productoDB.save();
            return producto;
        }
        return false;
    },
    create: async (producto) => {
        const productoDB = await Producto.create({
            ...producto,
            id_estado: process.env.PRODUCTO_REVISION,
        });
        return productoDB ? productoDB : false;
    },
    delete: async (id) =>
        await Producto.destroy({
            where: {
                id,
                id_estado: process.env.PRODUCTO_REVISION,
            },
        }),
    getById: async (id) => await Producto.findByPk(id),
    getProductosRevision: async () =>
        await Producto.findAll({
            where: { id_estado: process.env.PRODUCTO_REVISION },
        }),
    viewListaProductos: async (req, res) => {
        const productos = await Producto.findAll({
            where: { id_estado: process.env.PRODUCTO_APROBADO },
        });
        res.render("producto/lista-productos", { productos });
    },
};
