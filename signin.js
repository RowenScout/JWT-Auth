'use strict';

const jwt = require('jsonwebtoken');
const User = require('./lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const getHeader = require('./lib/getHeader.js');

module.exports = (_this, req, res, next) => {
      req.user = req.user || {};
      let authHeader = getHeader(req, next);
      if (req.user.message) return req, res, next();

User.findOne({username: authHeader['username']}).then(response => {
  if (response) {
      bcrypt.compare(authHeader.password, response.password)
      .then (
     function (res, err){
       if (res) {
         req.user.message = 'Signed in successfully!';
         req.user.authenticated = res;
           req.user.token = jwt.sign({id: response.uuid}, process.env.SECRET || 'change this');
          next();
       } else {
         req.user.message = 'Authentication failed!';
         req.user.authenticated = false;
         next();
       }
     });
  } else {
    req.user.message = 'Username does not exist!';
    req.user.authenticated = false;
    next();
  }

});
};
