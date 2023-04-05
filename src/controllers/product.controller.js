'use strict';

const productService = require('../services/product.service');

const { SuccessResponse } = require('../core/success.respose');

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Product created successfull',
            metadata: await productService.createProduct(req.body.product_type, req.body),
        }).send(res);
    };
}

module.exports = new ProductController();
