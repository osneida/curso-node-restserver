
const { Router } = require( 'express' );
const {   usuariosGet,
          usuariosPost,
          usuariosPut,
          usuariosPatch,
          usuariosDelete, } = require('../Controllers/usuariosController');

const router = Router();

router.get('/', usuariosGet );
router.put('/', usuariosPost );
router.post('/', usuariosPut );
router.patch('/', usuariosPatch );
router.delete('/', usuariosDelete );

module.exports = router;