var express = require('express');
var router = express.Router();
const ProductModel = require('../models/product-models');

require('dotenv').config();
const cors = require('cors');
router.use(cors());

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const products = await ProductModel.find(
      {},
      'name description price lager category'
    ).populate('category');

    res.status(200).json(products);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res, next) {
  try {
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
      res.status(404).json('ingen produkt hittad');
    }
  } catch (e) {
    console.error(e.message);
  }
});

router.get('/category/:id', async function (req, res, next) {
  try {
    const foundProducts = await ProductModel.find({
      category: req.params.id,
    }).populate('category');

    if (foundProducts) {
      res.status(200).json({ message: foundProducts });
    } else {
      res
        .status(404)
        .json({ message: 'hittade inte några produkter i den kategorin' });
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
