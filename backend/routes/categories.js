var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category-models');

router.get('/', async function (req, res) {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json({ message: categories });
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
