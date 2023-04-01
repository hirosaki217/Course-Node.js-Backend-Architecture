'use strict';

const apikeyModel = require('../models/apikey.model');
const crypto = require('crypto');
const findById = async (key) => {
    // const apiKey = crypto.randomBytes(64).toString('hex');
    // await apikeyModel.create({
    //     key: apiKey,
    //     permissions: ['0000'],
    // });
    const objKey = await apikeyModel.findOne({ key, status: true }).lean();

    return objKey;
};

module.exports = {
    findById,
};
