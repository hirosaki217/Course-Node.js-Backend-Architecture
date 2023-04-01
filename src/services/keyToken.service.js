'use strict';

const keytokenModel = require('../models/keytoken.model');

class KeyTokenService {
    // lv 0
    // static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    //     try {
    //         const tokens = await keytokenModel.create({
    //             user: userId,
    //             publicKey,
    //             privateKey,
    //         });

    //         return tokens ? tokens.publicKey : null;
    //     } catch (error) {
    //         return error;
    //     }
    // };

    // lv 2

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            const filter = {
                    user: userId,
                },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokensUsed: [],
                    refreshToken,
                },
                options = {
                    upsert: true,
                    new: true,
                };

            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options);

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
