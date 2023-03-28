'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;

// count connections
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    if (numConnection === 0) {
        console.log('No connections');
    } else {
        console.log(`Connections: ${numConnection}`);
    }
};

// check overload connect

const checkOverloadConnect = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // EXAMPLE: maximun number of connections based on number of cores
        const maxConnections = numCores * 5;
        console.log(`Active connections: ${numConnections}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
        if (numConnection > maxConnections) {
            console.log(`Connection overload detected`);
        }
    }, _SECONDS);
};

module.exports = {
    countConnect,
    checkOverloadConnect,
};
