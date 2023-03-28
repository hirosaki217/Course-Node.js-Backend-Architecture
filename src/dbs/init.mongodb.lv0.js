'use strict';
const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/shopFlower`;
mongoose
    .connect(connectString)
    .then((_) => console.log('Connected MongoDB Success'))
    .catch((err) => console.log(`Error Connected`));

// dev

if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose;
