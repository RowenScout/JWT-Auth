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
    const authHeader = getHeader(req, next);
    if (req.user.message) return req, res, next();

    // Ensure ip is stored first. We delete the ip if they managed to log in. 
    _this._attemptedLogin[req.ip] = _this._attemptedLogin[req.ip] || {attempts: 0};

    // Check if user has failed 3 times. If so, they should be blocked and the module ended.
    if (_this._attemptedLogin[req.ip].attempts === 3) return blockUser(_this, 'Account locked.' ,req, res , next);


    User.findOne({username: authHeader['username']}).then(response => {
        if (!response) if (!response) return incrementAttempts(_this, 'Invalid Credentials.' ,req, res, next);

        bcrypt.compare(authHeader.password, response.password).then(res => {
            if (res) {
                _this._attemptedLogin[req.ip] = null;
                delete _this._attemptedLogin[req.ip];

                req.user.message = 'Password Updated!';

                //SETTING NEW PASSWORD.
                bcrypt.hashAsync(authHeader.newPassword, 10).then(hash => {
                    User.findOneAndUpdate({username: response.username}, {password: hash},  {new: true}, function (err, res){
                        return next();
                    });
            
                });
            }
            else {
                incrementAttempts(_this,'Authentication failed!' ,req, res, next);
            }
            
        });
    });
};//end >3 if
