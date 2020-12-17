const express = require('express');
const router = express.Router();

const creditos_usuarios = require('./creditos_usuarios');
const tiendas = require('./tiendas');
const usuarios = require('./usuarios');

router.use('/', creditos_usuarios);
router.use('/', tiendas);
router.use('/', usuarios);

module.exports = {
    router
};