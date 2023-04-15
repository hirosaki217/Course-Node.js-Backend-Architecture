'use strict';

const productService = require('../services/product.service');
const productServiceV2 = require('../services/product.service.xxx');

const { SuccessResponse } = require('../core/success.respose');

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Product created successfull',
            metadata: await productServiceV2.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    updateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Product Success',
            metadata: await productServiceV2.updateProduct(req.body.product_type, req.params.productId, {
                ...req.body,
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Product is published successfully',
            metadata: await productServiceV2.publishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    unPublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Product is un publish successfully',
            metadata: await productServiceV2.unPublishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    // QUERY //
    /**
     * @description Get all draft products for shop
     * @param {Number} limit
     * @param {Number} skip
     * @returns {JSON}
     */
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list of all drafts for shop',
            metadata: await productServiceV2.findAllDraftsForShop({
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    getAllPublishForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list of all drafts for shop',
            metadata: await productServiceV2.findAllPublishForShop({
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    findAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'findAllProducts',
            metadata: await productServiceV2.findAllProducts(req.params),
        }).send(res);
    };

    findProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'findAllProducts',
            metadata: await productServiceV2.findProduct({
                product_id: req.params.product_id,
            }),
        }).send(res);
    };

    getListSearchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list search product',
            metadata: await productServiceV2.searchProducts(req.params),
        }).send(res);
    };
    // END QUERY //
}

module.exports = new ProductController();
