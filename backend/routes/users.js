var express = require('express');
var router = express.Router();
const UserModel = require('../models/user-models');

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const users = await UserModel.find({}, 'id name email');

    res.status(200).json(users);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/add', async function (req, res) {
  try {
    const users = [];
    const newUser = await UserModel.create(req.body);
    newUser.id = users.length + 1;
    users.push(newUser);

    console.log(users);

    res.status(201).json(newUser);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    const foundUser = await UserModel.findOne(req.body);

    if (password === foundUser.password && email === foundUser.email) {
      res.status(201).json(`${foundUser.name} har loggat in`);
    } else {
      res.status(401).json('ingen användare hittad');
    }
  } catch (e) {
    console.error(e.message);
  }
});

router.delete('/:id', async function (req, res) {
  await UserModel.findByIdAndDelete({ _id: req.params.id });

  res.status(200).json('user borttagen');
});

router.get('/', async function (req, res) {
  try {
    const { id } = req.body;
    const foundUser = await UserModel.findOne(req.body);

    if (id === foundUser.id) {
      res.status(201).json(`${foundUser.name} har hittats`);
    } else {
      res.status(401).json('ingen användare hittad');
    }

    res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
