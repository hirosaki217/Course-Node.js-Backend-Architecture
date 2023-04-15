'use strict';

const { model, Schema } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';
// Declare the Schema of the Mongo model
var inventorySchema = new Schema(
    {
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
        localtion: {
            type: String,
            default: 'unknown',
        },
        stock: {
            type: Number,
            required: true,
        },

        shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop',
        },

        reservations: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

//Export the model
module.exports = model(DOCUMENT_NAME, inventorySchema);
