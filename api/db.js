const db = require('mongoose');
const url = 'mongodb://47.91.95.237:27017/hello';

db.Promise = require('bluebird');

db.connect(url);
db.connection.on('connected', () => {
    console.log('MongoDB connection established!');
});

module.exports = db;
