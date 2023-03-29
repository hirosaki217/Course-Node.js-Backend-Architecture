'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
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
            const passwordHash = bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name,
                email,
                passwordHash,
                roles: RoleShop.SHOP,
            });
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
