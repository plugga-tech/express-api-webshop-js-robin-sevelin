var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

const UserModel = require('../models/user-models');
const bcrypt = require('bcrypt');

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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // const { name, email } = req.body;

    const newUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (e) {
    console.error(e.message);
  }
});

router.post('/login', async function (req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).send({ message: 'hittade ingen användare' });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json(user.id);
    } else {
      res.status(401).send({ message: 'ej matchande lösenord' });
    }
  } catch (e) {
    console.error(e.message);
  }
});

module.exports = router;
