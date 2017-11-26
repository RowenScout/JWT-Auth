'use strict';

const jwt = require('jsonwebtoken');
const User = require('./lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('./lib/getHeader.js');

module.exports = (_this, req, res, next) => {
      req.user = req.user || {};
      let authHeader = getHeader(req, next);
      if (req.user.message) return req, res, next();
      let currentDate = 0;
if(typeof _this._attemptedLogin[req.ip] === 'undefined') _this._attemptedLogin[req.ip] = {attempts: 0};

if (_this._attemptedLogin[req.ip].attempts === 3) {
  console.log('Attempt made');
  //handle timed out user
    currentDate = new Date().getTime();
    console.log(currentDate , _this._attemptedLogin[req.ip].failedDate);
  if (currentDate - _this._attemptedLogin[req.ip].failedDate < 300000) {
    req.user.message = 'Account timed out';
    console.log(req.user.message);
    return req, res, next();
  } else {
    req.user.message = 'Account unlocked. Please try to login again.';
    console.log(currentDate , _this._attemptedLogin[req.ip].failedDate);
    delete _this._attemptedLogin[req.ip];

    return req, res, next();
  }
}else{

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
           if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate = new Date().getTime();
           _this._attemptedLogin[req.ip].attempts ++;
         } else {
           console.log('David');
           _this._attemptedLogin[req.ip] = {};
           _this._attemptedLogin[req.ip].attempts = 1;
         }

         console.log(_this._attemptedLogin);
         next();
       }
     });
  } else {
    req.user.message = 'Username does not exist!';
    req.user.authenticated = false;

    if (_this._attemptedLogin[req.ip].attempts){
      if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate = new Date().getTime();
      _this._attemptedLogin[req.ip].attempts ++;
    } else {
      _this._attemptedLogin[req.ip].attempts = 1;
    }
    next();
  }

});
};//end >3 if
};
