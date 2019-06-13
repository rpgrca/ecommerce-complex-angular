const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Modelo del producto. La descripcion y la imagen son opcionales.
 * TODO: Agregar una imagen por defecto y hacer el campo imagen obligatorio.
 */
let EsquemaProducto = new Schema({
    nombre: { type: String, required: true, max: 100 },
    marca: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: false, max: 512 },
    precioLista: { type: Number, required: true },
    precioFinal: { type: Number, required: true },
    codigo: { type: String, required: true, max: 16 },
    imagen: { type: String, required: false, max: 100 },
    categorias: { type: [String], required: false, max: 256 }
});

module.exports = mongoose.model('Producto', EsquemaProducto);
