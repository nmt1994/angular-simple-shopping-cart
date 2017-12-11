const Order = require('./../model/order');
const Product = require('./../model/product');

function createOrder(req, res) {
    const newOrder = new Order();
    newOrder.userId = req.body.userId;
    newOrder.items = req.body.items;
    newOrder.date = new Date();
    newOrder.total = req.body.total;

    newOrder.save((err) => {
        if (err) throw err;
        return res.status(200).send(newOrder);
    })
}

function getOrderById(req, res) {
    Order.find({ 'userId': req.params.userId })
        .then((order) => {
            res.json(order);
        })
}

export default { createOrder, getOrderById };