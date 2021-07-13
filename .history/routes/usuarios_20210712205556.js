
const { Router } = require( 'express' );
const {   usuariosGet,
          usuariosPost,
          usuariosPut,
          usuariosPatch,
          usuariosDelete, } = require('../Controllers/usuariosController');

const router = Router();

router.get('/', usuariosGet );
router.post('/', usuariosPost );
router.put('/:id', usuariosPut );  //que se manda en el get
router.patch('/', usuariosPatch );
router.delete('/', usuariosDelete );

module.exports = router;
 