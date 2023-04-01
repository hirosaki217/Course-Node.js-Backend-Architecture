'use strict';

const { CREATED } = require('../core/success.respose');
const AccessService = require('../services/access.service');

class AccessController {
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
