const Product = require('./../model/product');

function preCreate(req, res) {
    for (let i = 0; i < 10; i++) {
        var newProduct = new Product();

        newProduct.price = Math.floor(Math.random() * 10) + 5;
        newProduct.name = "Product " + i;
        newProduct.description = "Product Description " + i;
        newProduct.quantity = Math.round(Math.random() * 10 * i);
        newProduct.save(function (err) {
            console.log('Product.preCreate', err);
            if (err) throw err;
            return done(null, newProduct);
        })
    }

    res.json({});
}

function index(req, res) {
    Product.find()
        .then((products) => {
            res.json(products);
        })
}

function update(req, res) {

}

export default { index, preCreate };