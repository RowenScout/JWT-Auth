
'use strict';

const mongoose = require('mongoose');

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const uuid = require('uuid');

const User =  new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    uuid: {type: String, unique: true},
    loggedIn: {type: String}
});

User.methods.hashify = (password) => {
    return bcrypt.hashAsync(password, 10).then(hash => {
        this.password = hash;
        this.uuid = uuid();
        return this;
    });
};

User.compare = (password, hash) => {
  return bcrypt.compare(password, hash).then (
   function (err, res){
     return;
   });
}

module.exports = mongoose.model('User', User);
