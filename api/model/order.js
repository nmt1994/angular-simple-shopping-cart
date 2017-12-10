const db = require('../db.js');

const orderSchema = db.Schema({
    _id: {
        type: db.SchemaTypes.ObjectId, auto: true
    },
    userId: {
        type: db.SchemaTypes.ObjectId,
        ref: 'Product'
    },
    items: [],
    total: {
        type: db.SchemaTypes.Number
    }
});

const Order = db.model('Order', orderSchema);

module.exports = Order;
