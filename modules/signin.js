'use strict';

const jwt = require('jsonwebtoken');
const User = require('../lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('../lib/getHeader.js');
const blockUser = require('../lib/blockUser.js');
const incrementAttempts = require('../lib/incrementAttempts');

module.exports = (_this, req, res, next) => {

    // standard functions to check headers are correct. If a message is set we know there is an error and we stop the module
    req.user = req.user || {};
    let authHeader = getHeader(req, next);
    if (req.user.message) return req, res, next();


    // Ensure ip is stored first. We delete the ip if they managed to log in. 
    _this._attemptedLogin[req.ip] = _this._attemptedLogin[req.ip] || {attempts: 0};

    // Check if user has failed 3 times. If so, they should be blocked and the module ended.
    if (_this._attemptedLogin[req.ip].attempts === 3) return blockUser(_this, 'Account is Locked.' ,req, res , next);

    User.findOne({username: authHeader['username']}).then(response => {
        if (!response) return incrementAttempts(_this, 'Username does not exist!' ,req, res, next);
        bcrypt.compare(authHeader.password, response.password)
            .then (
                function (res){
                    if (res) {
                        _this._attemptedLogin[req.ip] = null;
                        delete _this._attemptedLogin[req.ip];

                        req.user.message = 'Signed in successfully!';
                        req.user.authenticated = res;
                        req.user.token = jwt.sign({id: response.uuid}, process.env.SECRET || 'change this');
                        next();
                    } else {
                        incrementAttempts(_this, 'Authentication failed!' ,req, res, next);
                    }
                });
    });

};
