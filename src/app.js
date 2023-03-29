const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();

//init middlewares
// log cac request
app.use(morgan('dev'));
// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('short'));
// app.use(morgan('tiny'));

// bao ve url
app.use(helmet());

// nen du lieu
app.use(compression());

// init db
require('./dbs/init.mongodb');
// init routes
app.use('/', require('./routes'));

// handling errors

module.exports = app;
