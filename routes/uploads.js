const { Router } = require( 'express' );
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../Controllers/uploadsController');
const { coleccionesPermitidos } = require('../helpers');

const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un mongo ').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidos( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen );

module.exports = router;