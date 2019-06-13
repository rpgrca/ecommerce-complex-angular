const express = require('express');
const router = express.Router();
const cp = require('../controllers/controlador.producto');
const Producto = require('../models/modelo.producto');
const utils = require('../utilities/utilidades');

/**
 * Pagina principal de los productos. Esta es la pagina principal del sitio.
 */
router.get('/', cp.listarProductos);
router.get('/productos', cp.listarProductos);

/**
 * Ruta para mostrar un modelo especifico de producto.
 */
router.get('/item/:codigo', cp.buscarProductoPorCodigo);

/**
 * Ruta para listar productos filtrados por categoria.
 */
router.get('/categoria/:categoria', cp.listarPorCategoria);

/**
 * Ruta por defecto para /productos, cualquier url desconocida es redireccionada a la raiz.
 */
router.get('*', function(req, res) {
    res.redirect('/');
});

module.exports = router;
