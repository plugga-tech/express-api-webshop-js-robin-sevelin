var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-models');
const ProductModel = require('../models/product-models');

router.get('/all', async function (req, res) {
  const orders = await OrderModel.find().populate();

  res.status(200).json(orders);
});

router.post('/add', async function (req, res) {
  for (let i = 0; i < req.body.products.length; i++) {
    const orderAmount = req.body.products[i].quantity;
    console.log(req.body.products[i]);
    const updatedLager = await ProductModel.findByIdAndUpdate(
      req.body.products[i].productId,
      {
        $inc: { lager: -orderAmount },
      }
    );

    console.log(updatedLager);
  }

  const newOrder = await OrderModel.create(req.body);
  res.status(201).json(newOrder);
});

module.exports = router;
