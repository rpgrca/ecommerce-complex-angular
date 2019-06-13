const express = require('express');
const router = express.Router();
const cm = require('../controllers/controlador.mercado');
const cu = require('../controllers/controlador.usuario');

/**
 * Pagina principal de los productos. Esta es la pagina principal del sitio.
 */
router.post('/agregar', cu.validarUsuario, cm.agregar);
router.post('/remover', cu.validarUsuario, cm.remover);
router.post('/purgar', cu.validarUsuario, cm.purgar);
router.get('/listar', cu.validarUsuario, cm.listar);

module.exports = router;