var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

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
