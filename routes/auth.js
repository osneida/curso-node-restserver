const { Router } = require( 'express' );
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../Controllers/authController');


const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token','El id_token es necesario').notEmpty(),
    validarCampos
],googleSignin);

module.exports = router;