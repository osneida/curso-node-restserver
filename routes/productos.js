const { Router } = require( 'express' );
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');  
 
const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto } = require('../Controllers/productosController')

const router = Router();

//todas los productos publico
router.get('/', obtenerProductos);

//una  producto publico
router.get('/:id', [ 
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

//un crear producto privada - usuario con token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('categoria', 'No es un ID Válido, el de la Categoria').isMongoId(),
        check('categoria').custom( existeCategoriaPorId ),
        validarCampos   
    ],crearProducto );

//actualizar  productos privada - usuario con token valido
router.put('/:id', [
    validarJWT,
  //  check('nombre', 'El nombre es obligatorio').notEmpty(), no valido el nombre porque puede estar actualizando otro campo
    //check('categoria').custom( existeCategoriaPorId ), no puedo validar id categoria, porque lo obliga a ponerlo, lo hago en el controlador
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

//delete  producto privada - usuario con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );


module.exports = router;