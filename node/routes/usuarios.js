const express = require('express');
const router = express.Router();
const cu = require('../controllers/controlador.usuario');

/**
 * 
 */
router.post('/registrar', cu.registrarUsuario);
router.post('/acceder', cu.accederUsuario);

module.exports = router;
