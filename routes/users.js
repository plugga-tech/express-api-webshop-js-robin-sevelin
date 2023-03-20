var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  res.send('hej från endpoint users');
});

router.post('/add', function (req, res, next) {
  res.send('hej från endpoint users add');
});

router.post('/login', function (req, res, next) {
  res.send('hej från endpoint users login');
});

module.exports = router;
