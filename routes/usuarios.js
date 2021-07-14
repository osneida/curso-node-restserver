
const { Router } = require( 'express' );
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');  

const {   usuariosGet,
          usuariosPost,
          usuariosPut,
          usuariosPatch,
          usuariosDelete, } = require('../Controllers/usuariosController');

       

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),  //custom indica que hay una funcion que hace la validacion
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

module.exports = router;
 