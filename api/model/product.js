const db = require('../db.js');

const productSchema = db.Schema({
    _id: {
        type: db.SchemaTypes.ObjectId, auto: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Product = db.model('Product', productSchema);

module.exports = Product;
