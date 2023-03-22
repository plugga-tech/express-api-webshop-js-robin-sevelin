const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

async function init() {
  try {
    const options = { useUnifiedTopology: true, useNewUrlParser: true };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Vi är uppkopplade mot databasen!');
  } catch (error) {
    console.error(error);
  }
}

init();

module.exports = app;
