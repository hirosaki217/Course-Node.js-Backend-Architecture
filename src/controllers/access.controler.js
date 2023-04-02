'use strict';

const { CREATED, SuccessResponse } = require('../core/success.respose');
const AccessService = require('../services/access.service');

class AccessController {
    logout = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.logout(req.body),
        }).send(res);
    };

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res);
    };

    signUp = async (req, res, next) => {
        // console.log(`[P]::signUp::`, req.body);
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.signUp(req.body),
        }).send(res);
        // return res.status(201).json(await AccessService.signUp(req.body));
    };
}

module.exports = new AccessController();
