const Producto = require('../models/modelo.producto');
const constantes = require('../models/constantes');

/**
 * Si se encuentra logueado se sale de la aplicacion, redireccionando a la pagina principal
 */
//exports.salir = function(req, res, callback) {
//    if (req.session.user && req.cookies.user_sid) {
//        res.clearCookie(constantes.getSessionKey());
//    }
/*
    if (callback) {
        callback(req, res);
    }
}*/