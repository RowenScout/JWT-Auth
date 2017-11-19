'use strict';

const jwt = require('jsonwebtoken');
const User = require('./lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

module.exports = (req, res, next) => {
  req.user = req.user || {};
      let authHeader = req.headers.authorization;
      if (!authHeader) return next(new Error('No auth Header'));
      let base64 = authHeader.split('Basic ')[1];
      let base64Buffer = new Buffer(base64, 'base64');
      let stringHeader = base64Buffer.toString();
      let authArray = stringHeader.split(':');
      let authObject = {
        username: authArray[0],
        password:authArray[1]
      };

User.findOne({username: authObject['username']}).then(response => {
  if (response) {
      bcrypt.compare(authObject.password, response.password)
      .then (
     function (res, err){
       if (res) {
         req.user.authenticated = res;
           req.user.token = jwt.sign({id: response.uuid}, process.env.SECRET || 'change this');
          next();
       } else {
         req.user.authenticated = false;
         next();
       }
     });
    next();
  } else {
    req.user.authenticated = false;
    next();
  }

});
next();
};
