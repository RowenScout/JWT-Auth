'use strict';

const jwt = require('jsonwebtoken');
const User = require('../lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('../lib/getHeader.js');

module.exports = (_this, req, res, next) => {

      // standard functions to check headers are correct. If a message is set we know there is an error and we stop the module
      req.user = req.user || {};
      let authHeader = getHeader(req, next);
      if (req.user.message) return req, res, next();


      let currentDate = 0;

// Ensure ip is stored first. We delete the ip if they managed to log in. 
if(typeof _this._attemptedLogin[req.ip] === 'undefined') _this._attemptedLogin[req.ip] = {attempts: 0};

// Check if user has failed 3 times. If so, they should be blocked and the module ended.
if (_this._attemptedLogin[req.ip].attempts === 3) {

    currentDate = new Date().getTime();
  
  // 5 minute cooldown before they can log in again.
  if (currentDate - _this._attemptedLogin[req.ip].failedDate < 300000) {
    req.user.message = 'Account timed out.';
    return req, res, next();
  } else {
    req.user.message = 'Account unlocked. Please try to login again.';
    delete _this._attemptedLogin[req.ip];

    return req, res, next();
  }
} else {

// IP is not timed out and we check the db based on what they provide. 
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

        // Check to see if they have failed before. If they reach 3 this time, set the cooldown timer to the current epoch time. If not, increment attempts by 1.
         if (_this._attemptedLogin[req.ip].attempts){
           if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate = new Date().getTime();
           _this._attemptedLogin[req.ip].attempts ++;
         } else {
           _this._attemptedLogin[req.ip] = {};
           _this._attemptedLogin[req.ip].attempts = 1;
         }
         next();
       }
     });
  } else {
    req.user.message = 'Username does not exist!';
    req.user.authenticated = false;

    // Check to see if they have failed before. If they reach 3 this time, set the cooldown timer to the current epoch time. If not, increment attempts by 1.
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
