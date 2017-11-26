const User = require('./lib/user.js');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

module.exports = (req, res, next) => {
  console.log("Logout Testing");
  req.user = req.user || {};
//invalidate token
//set authorication from true to false
//get bearer token from req.user
//change uuid

  // console.log(req.headers);

  req.headers = req.headers || {};
  let bearer = req.headers.authorization;
  if (!bearer) return next(new Error ('Bearer invalid'));
  let token = bearer.split('Bearer ')[1];
    // console.log(token);
  let verified = jwt.verify(token, process.env.SECRET || 'change this')
    // console.log(verified);
  // search db for matches verfied.id
  User.findOne({uuid: verified['id']}).then(response => {
  console.log('previous uuid:', response.uuid);
    if(res) {
      User.findOneAndUpdate({uuid: response.uuid}, {uuid: uuid()}, {new: true}, function (err, res){
        console.log(err, res);
        req.user.message('Logout sucessful.');
        next();
      })
    } else {
      req.user.message('Logout unsuccessful.');
      next();
    }
  })
};
