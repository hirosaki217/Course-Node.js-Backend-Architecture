'use strict';

const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
    REFRESHTOKEN: 'x-rtoken-id',
};

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '2 days',
        });

        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '7 days',
        });

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {}
};

const authentication = asyncHandler(async (req, res, next) => {
    /*
        1 - check userId missing?
        2 - get access token
        3 - verify token
        4 - check user in database
        5 - check keyStore with this userId?
        6 - OK all => return next()
    
    */
    const userId = req.headers[HEADER.CLIENT_ID]?.toString();
    if (!userId) throw new AuthFailureError('Invalid Request');

    // 2
    const keyStore = await findByUserId(userId);

    if (!keyStore) throw new NotFoundError('Not found keyStore');

    // 3
    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthFailureError('Invalid Request');

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }
});

const authenticationV2 = asyncHandler(async (req, res, next) => {
    /*
        1 - check userId missing?
        2 - get access token
        3 - verify token
        4 - check user in database
        5 - check keyStore with this userId?
        6 - OK all => return next()
    
    */
    const userId = req.headers[HEADER.CLIENT_ID]?.toString();
    if (!userId) throw new AuthFailureError('Invalid Request');
    console.log('USER ID: ' + userId);
    // 2
    const keyStore = await findByUserId(userId);

    console.log('keyStore ID: ' + keyStore);
    if (!keyStore) throw new NotFoundError('Not found keyStore');

    // 3
    if (req.headers[HEADER.REFRESHTOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESHTOKEN]?.toString();
            if (!refreshToken) throw new AuthFailureError('Invalid Request');

            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey);
            if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
            req.keyStore = keyStore;
            req.user = decodeUser;
            req.refreshToken = refreshToken;
            return next();
        } catch (error) {
            throw new Error(error);
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthFailureError('Invalid Request');

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }
});

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret);
};

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT,
    authenticationV2,
};
