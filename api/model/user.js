import { SchemaTypes } from 'mongoose';

const db = require('./../db');

const userSchema = db.Schema({
    _id: {
        type: SchemaTypes.ObjectId, auto: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    }
})


const User = db.model('User', userSchema);

module.exports = User;