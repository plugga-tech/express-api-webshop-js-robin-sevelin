var express = require('express');
var router = express.Router();
const OrderModel = require('../models/order-models');
const ProductModel = require('../models/product-models');
require('dotenv').config();
const cors = require('cors');
router.use(cors());

router.get('/all/:token', async function (req, res) {
  try {
    let token = req.params.token;

    if (token === process.env.ACCESS_KEY) {
      const orders = await OrderModel.find().populate();
      res.status(200).json(orders);
    } else {
      res.status(401).json({ message: 'Du saknar behörighet' });
    }
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    for (let i = 0; i < req.body.products.length; i++) {
      const orderAmount = req.body.products[i].quantity;
      const updatedLager = await ProductModel.findByIdAndUpdate(
        req.body.products[i].productId,
        {
          $inc: { lager: -orderAmount },
        }
      );
    }

    const newOrder = await OrderModel.create(req.body);
    res.status(201).json(newOrder);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/user', async function (req, res, next) {
  try {
    if (req.body.token === process.env.ACCESS_KEY) {
      const userOrders = await OrderModel.find({
        user: req.body.user,
      }).populate('user products');

      res.status(200).json(userOrders);
    } else {
      res.status(401).json({ message: 'inte behörig' });
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
