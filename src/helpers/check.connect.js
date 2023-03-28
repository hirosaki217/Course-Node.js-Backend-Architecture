'use strict';

const mongoose = require('mongoose');
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    if (numConnection === 0) {
        console.log('No connections');
    } else {
        console.log(`Connections: ${numConnection}`);
    }
};

module.exports = {
    countConnect,
};
