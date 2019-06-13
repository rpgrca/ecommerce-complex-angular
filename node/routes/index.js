const express = require('express');
const router = express.Router();

const utils = require('../utilities/utilidades');
const Usuario = require('../models/modelo.usuario');

/**
 * Pagina principal del sitio, redirige a la pagina principal de los productos.
 */
router.get('/',  function(req, res) {
    res.redirect('productos');
});

module.exports = router;
