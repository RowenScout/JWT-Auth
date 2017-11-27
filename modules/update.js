'use strict';

const jwt = require('jsonwebtoken');
const User = require('../lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('../lib/getHeader.js');

module.exports = (_this, req, res, next) => {

  // standard functions to check headers are correct. If a message is set we know there is an error and we stop the module
  req.user = req.user || {};
  const authHeader = getHeader(req, next);
  if (req.user.message) return req, res, next();

  // comments explaining the brute force prevention can be found in signin.js
  let currentDate = 0;
  if(typeof _this._attemptedLogin[req.ip] === 'undefined') _this._attemptedLogin[req.ip] = {attempts: 0};

  if (_this._attemptedLogin[req.ip].attempts === 3) {
  //handle timed out user
    currentDate = new Date().getTime();
    if (currentDate - _this._attemptedLogin[req.ip].failedDate < 300000) {
      req.user.message = 'Account timed out';
      return req, res, next();
    } else {
      req.user.message = 'Account unlocked. Please try to login again.';
      delete _this._attemptedLogin[req.ip];

      return req, res, next();
    }
  } else {

    if(!authHeader.newPassword) {
      req.user.message = 'New password was not provided.';
      return req, res, next();
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

              req.user.message = 'Password Updated!';

              //SETTING NEW PASSWORD.
              bcrypt.hashAsync(authHeader.newPassword, 10).then(hash => {
                User.findOneAndUpdate({username: response.username}, {password: hash},  {new: true}, function (err, res){
                  return next();
                });
            
              });


            } else {
              req.user.message = 'Authentication failed!';
              req.user.authenticated = false;

              if (_this._attemptedLogin[req.ip].attempts){
                if (_this._attemptedLogin[req.ip].attempts === 2)   _this._attemptedLogin[req.ip].failedDate = new Date().getTime();
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

          if (_this._attemptedLogin[req.ip].attempts){
            if (_this._attemptedLogin[req.ip].attempts === 2) _this._attemptedLogin[req.ip].failedDate =  new Date().getTime();
            _this._attemptedLogin[req.ip].attempts ++;
          } else {
            _this._attemptedLogin[req.ip].attempts = 1;
          }
          next();
        }

      });
    };//end >3 if
