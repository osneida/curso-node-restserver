const { Router } = require( 'express' );
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');  
 
const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria } = require('../Controllers/categoriaController')

const router = Router();

//todas las categorias publico
router.get('/', obtenerCategorias);

//una  categorias publico
router.get('/:id', [ 
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

//una  categorias privada - usuario con token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarCampos   
    ],crearCategoria );

//actualizar  categorias privada - usuario con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria );

//deete  categorias privada - usuario con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria );


module.exports = router;