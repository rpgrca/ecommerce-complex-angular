const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

/**
 * Modelo del usuario en base de datos. El usuario es el e-mail.
 * TODO: La clave deberia guardarse encriptada.
 */
let EsquemaUsuario = new Schema({
    nombre: { type: String, required: true, max: 32 },
    apellido: { type: String, required: true, max: 32 },
    email: { type: String, required: true, max: 100 },
    dni: { type: Number, required: false, max: 100000000 },
    telefono: { type: String, required: false, max: 20 },
    clave: { type: String, trim: true, required: true, max: 16 },
    carrito: { type: Object, required: false, max: 256 }
});

EsquemaUsuario.pre('save', function(next) {
    this.clave = bcyrpt.hashSync(this.clave, 10);
    next();
});

module.exports = mongoose.model('Usuario', EsquemaUsuario);
