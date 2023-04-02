'use strict';

const { Types } = require('mongoose');
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

    static findByUserId = async (userId) => {
        return await keytokenModel.findOneAndUpdate({ user: Types.ObjectId(userId) });
    };
    static removeKeyById = async (id) => {
        return await keytokenModel.remove({ _id: id });
    };
    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken }).lean();
    };

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshToken });
    };

    static deleteKeyById = async (userId) => {
        return await keytokenModel.deleteOne({ user: userId });
    };
}

module.exports = KeyTokenService;
