const User = require('./lib/user.js');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

module.exports = (req, res, next) => {
  console.log("Logout Testing");

//invalidate token
//set authorication from true to false
//get bearer token from req.user
//change uuid

  console.log(req.headers);

  req.headers = req.headers || {};
  let bearer = req.headers.authorization;
  if (!bearer) return next(new Error ('Bearer invalid'));
  let token = bearer.split('Bearer ')[1];
    console.log(token);
  let verified = jwt.verify(token, process.env.SECRET || 'change this')
    console.log(verified);
  // search db for matches verfied.id
  User.findOne({uuid: verified['id']}).then(response => {
  console.log(response);
    if(res) {
      req.user.authenticated = false;
      res.uuid = new uuid();
      res.save();
      next();
    }
  })
};
