
const { Router } = require( 'express' );

const router = Router();

router.get('/', usuariosGet);

  router.put('/', (req, res) => {
    res.json({
        mess: 'put api',
    });
  });

  router.post('/', (req, res) => {
    res.json({
        mess: 'post api',
    });
  });

  router.delete('/', (req, res) => {
    res.json({
        mess: 'delete api',
    });
  });


  module.exports = router;