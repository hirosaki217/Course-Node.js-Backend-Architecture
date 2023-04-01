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
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// init db
require('./dbs/init.mongodb');
// init routes
app.use('/', require('./routes'));

// handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;
