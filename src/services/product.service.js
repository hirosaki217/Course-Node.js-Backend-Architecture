'use strict';

const { product, clothing, electroic } = require('../models/product.model');

const { BadRequestError, ForbiddenError } = require('../core/error.response');

// define Factory class to create product

class ProductFactory {
    /*
        type: 'Clothing',
        payload
    */
    static async createProduct(type, payload) {
        switch (type) {
            case 'Clothing':
                return new Clothing(payload).createProduct();

            case 'Electronic':
                return new Electronic(payload).createProduct();
            default:
                throw new BadRequestError('Invalid product type: ' + type);
        }
    }
}

// difine basic class product

class Product {
    constructor({
        product_name,
        product_description,
        product_thumb,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes,
    }) {
        this.product_name = product_name;
        this.product_description = product_description;
        this.product_thumb = product_thumb;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }

    // create new product

    async createProduct() {
        return await product.create(this);
    }
}

// difine sub-class for different products types Clothing

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes);
        if (!newClothing) throw new BadRequestError('create new Clothing error');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('create new Product error');
        return newProduct;
    }
}

// difine sub-class for different products types Electronics

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electroic.create(this.product_attributes);
        if (!newElectronic) throw new BadRequestError('create new Electronic error');

        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('create new Product error');

        return newProduct;
    }
}

module.exports = ProductFactory;
