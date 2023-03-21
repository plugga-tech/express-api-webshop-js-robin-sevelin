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
    const name = req.body.name;
    const email = req.body.email;

    const password = CryptoJS.AES.encrypt(
      req.body.password,
      'Salt Nyckel'
    ).toString();

    const newUser = await UserModel.create({ name, email, password });

    console.log(newUser);

    res.status(201).json(newUser);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/login', async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const foundUser = await UserModel.findOne({ email });

    if (password === req.body.password) {
      res.status(201).json(`${foundUser.name} har loggat in`);
    } else {
      res.status(401).json('ingen användare hittad');
    }
  } catch (e) {
    console.error(e.message);
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    const foundUser = await UserModel.findByIdAndDelete({ _id: req.params.id });

    if (foundUser) {
      res.status(200).json('user borttagen');
    } else {
      res.status(401).json('hittade ingen user');
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
