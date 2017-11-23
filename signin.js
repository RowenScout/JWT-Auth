'use strict';

const jwt = require('jsonwebtoken');
const User = require('./lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('./lib/getHeader.js');

module.exports = (_this, req, res, next) => {
      req.user = req.user || {};
      let authHeader = getHeader(req, next);
      if (req.user.message) return req, res, next();
      let currentDate = new Date().getTime();


if (_this._attemptedLogin[req.ip] === 3) {
  //handle timed out user
  if (currentDate - _this._attemptedLogin[req.ip].failedDate > 50000) {
    return req, res, next();
  } else {
    delete _this._attemptedLogin[req.ip];
  }
}

User.findOne({username: authHeader['username']}).then(response => {
  if (response) {
      bcrypt.compare(authHeader.password, response.password)
      .then (
     function (res, err){
       if (res) {
         _this._attemptedLogin[req.ip] = null;
         delete _this._attemptedLogin[req.ip];

         req.user.message = 'Signed in successfully!';
         req.user.authenticated = res;
           req.user.token = jwt.sign({id: response.uuid}, process.env.SECRET || 'change this');
          next();
       } else {
         req.user.message = 'Authentication failed!';
         req.user.authenticated = false;

         if (_this._attemptedLogin[req.ip].attempts){
           if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate = currentDate;
           _this._attemptedLogin[req.ip].attempts ++;
         } else {
           _this._attemptedLogin[req.ip].attempts = 1;
         }

         next();
       }
     });
  } else {
    req.user.message = 'Username does not exist!';
    req.user.authenticated = false;

    if (_this._attemptedLogin[req.ip].attempts){
      if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate = currentDate;
      _this._attemptedLogin[req.ip].attempts ++;
    } else {
      _this._attemptedLogin[req.ip].attempts = 1;
    }
    next();
  }

});

};
