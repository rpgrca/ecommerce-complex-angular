const Producto = require('../models/modelo.producto');

/**
 * Retorna los productos de la base de datos.
 */
exports.listarProductos = function(req, res) {
    Producto.find({}, function(err, prods) {
        res.json(prods);
    });
};

/**
 * Retorna los productos en una determinada categoria.
 */
exports.listarPorCategoria = function(req, res) {
    Producto.find({categorias: req.params.categoria}, function(err, prods) {
        res.json(prods);
    });
};

/**
 * Realiza una busqueda de un producto por codigo, si lo encuentra lo visualiza, en caso
 * contrario redirige a la pagina principal.
 */
exports.buscarProductoPorCodigo = function(req, res) {
    Producto.findOne({ codigo: req.params['codigo'] }, function(err, prod) {
        if (prod) {
            res.json(prod);
        }
        else {
            // No se encontro el codigo, retornar vacio
            res.status(404).send({
                error: "error",
                message: `Producto con código ${req.params['codigo']} no encontrado`
            });
        }
    });
}
