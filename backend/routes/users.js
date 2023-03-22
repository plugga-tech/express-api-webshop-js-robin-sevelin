var express = require('express');
var router = express.Router();

const UserModel = require('../models/user-models');
const CryptoJS = require('crypto-js');

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const users = await UserModel.find({}, 'name email');
    res.status(200).json(users);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/', async function (req, res) {
  try {
    const foundUser = await UserModel.findOne({ _id: req.body.id });

    res.status(200).json(foundUser);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    const { name, email, password } = req.body;

    const newUser = await UserModel.create({ name, email, password });

    console.log(newUser);

    res.status(201).json(newUser);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    const logUser = await UserModel.findOne({ email, password });

    if (logUser) {
      res.status(201).json(`du har loggat in`);
    } else {
      res.status(401).json('inloggningen misslyckades');
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
