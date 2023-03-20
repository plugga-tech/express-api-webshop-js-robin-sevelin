var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-models');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async function (req, res, next) {
  const product = await ProductModel.find({ _id: req.params.id });

  res.status(200).json(product);
});

router.post('/add', async function (req, res, next) {
  const product = await ProductModel.create(req.body);

  res.status(201).json(product);
});

router.post('/orders/add', async function (req, res, next) {
  res.send('hej från api products order add end point');
});

router.get('/orders/all', async function (req, res, next) {
  res.send('hej från products orders all end point');
});

module.exports = router;
