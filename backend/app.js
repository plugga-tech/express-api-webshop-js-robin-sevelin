var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

var app = express();

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

    await mongoose.connect('mongodb://localhost:27017/robin-sevelin', options);
    console.log('Vi är uppkopplade mot databasen!');
  } catch (error) {
    console.error(error);
  }
}

init();

module.exports = app;
