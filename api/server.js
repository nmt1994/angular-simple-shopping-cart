const express = require('express');
import { Server } from 'http';
import compression from 'compression';
import bodyParser from 'body-parser';

import path from 'path';

import * as productController from './controllers/product-controller';
import * as userController from './controllers/user-controller';
import * as orderController from './controllers/order-controller';


const app = express();
const server = Server(app);

app.set('port', (process.env.PORT || 3000));
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', bodyParser.json());

// Product
app.get('/api/product', productController.index);
app.post('/dev/product', productController.preCreate)
app.post('/api/product/:productId', productController.updateQuantity);
app.delete('/api/product/:productId', productController.removeProduct)
app.post('/api/product/', productController.createProduct);

// User
app.post('/api/user/login', userController.login);

app.post('/dev/user/1', userController.preCreateOwner);
app.post('/dev/user/2', userController.preCreateCustomer);
app.post('/dev/user/3', userController.preCreateEmployee);

// Order
app.get('/api/order/:userId', orderController.getOrderById);
app.post('/api/order', orderController.createOrder);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
});



server.listen(app.get('port'), () => {
    console.log('App is running on port ' + app.get('port'))
})

export default server;