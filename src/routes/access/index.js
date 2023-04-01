'use strict';

const express = require('express');
const accessControler = require('../../controllers/access.controler');
const { asyncHandler } = require('../../auth/checkAuth');

const router = express.Router();
// sigup

router.post('/shop/signup', asyncHandler(accessControler.signUp));

module.exports = router;
