'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const RoleShop = {
    SHOP: '0000',
    WRITER: '0001',
    EDITOR: '0002',
    ADMIN: '0003',
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        try {
            // step 1: check email exists ?
            const hoderShop = await shopModel
                .findOne({
                    email,
                })
                .lean();

            if (hoderShop) {
                return {
                    code: 'xxxxxxxx',
                    message: 'Shop already registered',
                };
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
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                });

                console.log({ privateKey, publicKey });
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });

                if (!publicKeyString) {
                    return {
                        code: 'xxxxxxxx',
                        message: 'publicKeyString error',
                    };
                }
                // created token pairs
                const publicKeyObject = crypto.createPublicKey(publicKeyString);
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey);

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
        } catch (error) {
            return {
                code: 'xxxxxxxx',
                message: error.message,
                status: 'error',
            };
        }
    };
}

module.exports = AccessService;
