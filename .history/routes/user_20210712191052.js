
const { Router } = require( 'exprexx' );

const router = Router();

router.get('/api', (req, res) => {
    res.json({
       mes: 'get api',
    });
  });

  router.put('/api', (req, res) => {
    res.json({
        mes: 'put api',
    });
  });

  router.post('/api', (req, res) => {
    res.json({
        mes: 'post api',
    });
  });

  router.delete('/api', (req, res) => {
    res.json({
        mes: 'delete api',
    });
  });


  module.exports = router;