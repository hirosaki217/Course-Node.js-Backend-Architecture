'use strict';

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            return res.status(201).json({
                code: '2001',
                metadata: { userid: 1 },
            });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new AccessController();
