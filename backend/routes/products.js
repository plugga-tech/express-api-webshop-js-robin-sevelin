var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-models');
require('dotenv').config();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res, next) {
  try {
    console.log(req.body.token);
    console.log(process.env.ACCESS_KEY);
    if (req.body.token === process.env.ACCESS_KEY) {
      const newProduct = await ProductModel.create(req.body);

      res.status(201).json(newProduct);
    } else {
      res.status(401).json('Invalid token');
    }
  } catch (e) {
    console.error(e.message);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const product = await ProductModel.findById({ _id: req.params.id });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(401).json('ingen produkt hittad');
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
