'use strict';

const User = require('./model/user.js');

module.exports = function(req){

  let authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error('No auth Header'));

  let base64 = authHeader.split('Basic ')[1];
  let base64Buffer = new Buffer(base64, 'base64');
  let stringHeader = base64Buffer.toString();
  let authArray = stringHeader.split(':');

  let authObject = {};
  authObject.username = authArray[0],
  authObject.password = authArray[1]
  let user = new User(authObject);

  if(authArray.length === 3) user.newPassword = authArray[2];

  return user;
}
