var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-models');

router.get('/all', async function (req, res) {
  const orders = await OrderModel.find().populate();

  res.status(200).json(orders);
});

router.post('/add', async function (req, res) {
  const newOrder = await OrderModel.create(req.body);

  res.status(201).json(newOrder);
});

module.exports = router;
