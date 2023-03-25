var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/category-models');
require('dotenv').config();
const cors = require('cors');
router.use(cors());

router.get('/', async function (req, res) {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json(categories);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    if (req.body.token === process.env.ACCESS_KEY) {
      const newCategory = await CategoryModel.create({ name: req.body.name });

      res.status(201).json({ message: 'kategori skapad', newCategory });
    } else {
      res.status(401).json({ message: 'Neckad' });
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
