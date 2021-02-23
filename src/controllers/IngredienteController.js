const { Ingrediente } = require("../repository/database/index").models;

module.exports = {
    create: async (ingrediente) => {
        const ingredienteDB = await Ingrediente.create({ 
            nombre: ingrediente.nombre,
            stock: ingrediente.stock,
            precio: ingrediente.precio
        });
        return ingredienteDB;
    },
    delete: async (id) => { 
        const ingrediente = await Ingrediente.findByPk(id);
        if(ingrediente){
            ingrediente.destroy();
            return ingrediente;
        }
        return false;
    },
    update: async (ingrediente) =>{
        const { id, nombre, stock, precio } = ingrediente;
        const ingredienteDB = await Ingrediente.findByPk(id);
        if(ingredienteDB) {
            ingredienteDB.nombre = nombre;
            ingredienteDB.stock = stock;
            ingredienteDB.precio = precio;
            ingredienteDB.save();
            return ingrediente;
        }
        return false;
    },
    getById: async (id) => await Ingrediente.findByPk(id),
    getIngredientes: async () => await Ingrediente.findAll(),
};
