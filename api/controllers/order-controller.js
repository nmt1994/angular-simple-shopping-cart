const Order = require('./../model/order');
const Product = require('./../model/product');

function createOrder(req, res) {
    const newOrder = new Order();
    newOrder.userId = req.body.userId;
    newOrder.items = req.body.items;

    newOrder.save((err) => {
        if (err) throw err;
        return res.status(200).send(newOrder);
    })
}


export default { createOrder };