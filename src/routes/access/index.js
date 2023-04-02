'use strict';

const express = require('express');
const accessControler = require('../../controllers/access.controler');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');

const router = express.Router();
// sigup

router.post('/shop/signup', asyncHandler(accessControler.signUp));
router.post('/shop/login', asyncHandler(accessControler.login));

// authenticate
router.use(authentication);

router.post('/shop/logout', asyncHandler(accessControler.logout));

module.exports = router;
