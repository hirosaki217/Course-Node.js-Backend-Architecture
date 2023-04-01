'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const { findByEmail } = require('./shop.service');
const RoleShop = {
    SHOP: '0000',
    WRITER: '0001',
    EDITOR: '0002',
    ADMIN: '0003',
};

class AccessService {
    /*
        1 - check email in database
        2 - match password
        3 - create access token & create refresh token
        4 - generate tokens
        5 - get data return login
    */
    static login = async ({ email, password, refreshToken = null }) => {
        const foundShop = await findByEmail({ email });
        //1
        if (!foundShop) throw new BadRequestError('Shop not registered');
        //2
        const match = bcrypt.compare(password, foundShop.password);
        if (!match) throw new AuthFailureError('Authentication error');

        // 3
        // easier
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        // 4
        // created token pairs
        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey);

        await KeyTokenService.createKeyToken({
            userId: newShop._id,
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
        });

        return {
            shop: getInfoData({ fields: ['_id', 'email', 'name'], object: foundShop }),
            tokens,
        };
    };

    static signUp = async ({ name, email, password }) => {
        // try {
        // step 1: check email exists ?
        const hoderShop = await shopModel
            .findOne({
                email,
            })
            .lean();

        if (hoderShop) {
            throw new BadRequestError('Error: Shop already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            roles: RoleShop.SHOP,
        });

        if (newShop) {
            // create private key and public key
            // hardcoded
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem',
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem',
            //     },
            // });

            // easier
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            console.log({ privateKey, publicKey });
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) {
                return {
                    code: 'xxxxxxxx',
                    message: 'keyStore error',
                };
            }
            // created token pairs
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'email', 'name'], object: newShop }),
                    tokens,
                },
            };
        }
        return {
            code: 200,
            metadata: null,
        };
        // } catch (error) {
        //     return {
        //         code: 'xxxxxxxx',
        //         message: error.message,
        //         status: 'error',
        //     };
        // }
    };
}

module.exports = AccessService;
