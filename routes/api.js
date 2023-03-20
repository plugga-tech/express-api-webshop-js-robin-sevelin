var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('hej från api end point');
});

router.get('/products', function (req, res, next) {
  res.send('hej från api products end point');
});

router.get('/products/:id', function (req, res, next) {
  const id = req.params.id;
  res.send('hej från specifik api product id endpoint' + id);
});

router.post('/products/add', function (req, res, next) {
  res.send('hej från api products add end point');
});

router.post('/products/orders/add', function (req, res, next) {
  res.send('hej från api products order add end point');
});

module.exports = router;
