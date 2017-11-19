'use strict';

const User = require('./model/user.js');

// const create = require('./create.js');

module.exports = (req, res, next) => {

  req.user = req.user || {};

  let authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error('No auth Header'));

  let base64 = authHeader.split('Basic ')[1];
  let base64Buffer = new Buffer(base64, 'base64');
  let stringHeader = base64Buffer.toString();
  let authArray = stringHeader.split(':');

  let authObject = {};
  authObject.username = authArray[0],
  authObject.password = authArray[1]
  let newPassword = authArray[2];

  //const user = create(req, next);

  let user = new User(authObject);

  User.findOne({username: authObject['username']})
  .then(response => {

    if!response req.user.message = {message: 'Username not found.'} && return;
    if!req.user.token req.user.message = {message: 'Please sign in.'} && return;

    let validToken = jwt.sign({id: response.uuid}, process.env.SECRET;

    if req.user.token !=== validToken user.message = {message: 'Bad Token.'}
    && return;

    bcrypt.compare(authObject.password, response.password)
    .then((res, err) => {
      if (res) {
        user.password = newPassword;
        user.save().then(response => {
          req.user.message = {message: 'password updated!'}
          next();
        });
      } else {req.user.message = {message: 'password incorrect.'}};
    });
  });
};
