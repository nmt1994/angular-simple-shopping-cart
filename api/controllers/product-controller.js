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

function createProduct(req, res) {
    const form = req.body;

    var newProduct = new Product();
    newProduct.name = form.productName;
    newProduct.description = form.productDescription;
    newProduct.quantity = form.productQuantity;
    newProduct.price = req.body.productPrice;

    newProduct.save(err => {
        if (err) res.status(400).send(err);

        res.status(200).send(newProduct);

    })
}

function removeProduct(req, res) {
    Product.findByIdAndRemove(req.params.productId, err => {
        if (err) throw err;
        console.log('Remove success');
        res.status(200).send({});
    })
}

function updateQuantity(req, res) {
    Product.findById(req.params.productId).then(result => {
        if (result != null) {
            const quantity = req.body.quantity;
            result.quantity = quantity;
            result.save(err => {
                if (err) throw err;
                res.status(200).send({ message: 'Success' });
            })
        } else {
            res.status(400).send('No product found');
        }
    })
}

export { index, preCreate, createProduct, removeProduct, updateQuantity };