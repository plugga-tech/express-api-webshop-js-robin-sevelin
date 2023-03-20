var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-models');

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
});

router.post('/:id', async function (req, res) {
  try {
    const user = await UserModel.find({ _id: req.params.id });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

router.post('/add', async function (req, res) {
  const user = await UserModel.create(req.body);

  res.status(201).json(user);
});

router.post('/login', function (req, res) {
  res.send('hej från endpoint users login');
});

module.exports = router;
