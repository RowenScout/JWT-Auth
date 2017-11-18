'use strict';

const User = require('./model/user.js');
// const create = require('./create.js');

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error('No auth Header'));

  let base64 = authHeader.split('Basic ')[1];
  let base64Buffer = new Buffer(base64, 'base64');
  let stringHeader = base64Buffer.toString();
  let authArray = stringHeader.split(':');
  let authObject = {};
  authObject.username = authArray[0],
  authObject.password = authArray[1]

  //const user = create(req);
  let user = new User(authObject);

  let newPassword = authArray[2];

  User.findOne({username: authObject['username']})
  .then(response => {
    if(response){
      user.hashify(this.oldPassword).then(hash=>{
        if(response.password === user.oldPassword){
          user.uuid = uuid();
          user.password = newPassword;
          user.save().then(response => {
            req.user = {message: 'password updated!'}
            next();
          });
        };
      });
    };
  });
};
