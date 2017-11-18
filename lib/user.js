'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const uuid = require('uuid');

const User =  new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    uuid: {type: String, unique: true}
});

User.methods.hashify = (password) => {
    return bcrypt.hashAsync(password, 10).then(hash => {
        this.password = hash;
        this.uuid = uuid();
        return this;
    });
};



// create user.pre that adds uuid to the user being saved
// create method that compares password for auth
// create method that creates token

module.exports = mongoose.model('User', User);