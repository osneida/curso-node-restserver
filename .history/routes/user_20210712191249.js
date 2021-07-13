
const { Router } = require( 'exprexx' );

const router = Router();

router.get('/', (req, res) => {
    res.json({
       mes: 'get api',
    });
  });

  router.put('/', (req, res) => {
    res.json({
        mes: 'put api',
    });
  });

  router.post('/', (req, res) => {
    res.json({
        mes: 'post api',
    });
  });

  router.delete('/', (req, res) => {
    res.json({
        mes: 'delete api',
    });
  });


  module.exports = router;