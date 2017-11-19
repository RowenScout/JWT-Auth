'use strict';

const User = require('./model/user.js');

module.exports = function(req, next){

  if(!req.headers.authorization)return next(new Error('No auth Header'));
  let authHeader = req.headers.authorization;

  let base64 = authHeader.split('Basic ')[1];
  let base64Buffer = new Buffer(base64, 'base64');
  let stringHeader = base64Buffer.toString();
  let authArray = stringHeader.split(':');

  let authObject = {};

  //check for username/password
  //put the message on req.user.message

  authObject.username = authArray[0],
  authObject.password = authArray[1]
  let user = new User(authObject);

  if(authArray[2]) user.newPassword = authArray[2];

  req.user = {message: 'user created', user: user};

  next();
}
