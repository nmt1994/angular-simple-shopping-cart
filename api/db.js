const db = require('mongoose');
const url = 'mongodb://localhost:27017/hello';

db.Promise = require('bluebird');

db.connect(url);
db.connection.on('connected', () => {
    console.log('MongoDB connection established!');
});

module.exports = db;
