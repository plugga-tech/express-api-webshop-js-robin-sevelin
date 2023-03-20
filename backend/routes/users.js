var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-models');
const userModels = require('../models/user-models');

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const users = await UserModel.find({}, 'name _id email');

    res.status(200).json(users);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/:id', async function (req, res) {
  try {
    const user = await UserModel.find({ _id: req.params.id });

    res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/login', function (req, res) {
  res.send('hej från endpoint users login');
});

module.exports = router;
