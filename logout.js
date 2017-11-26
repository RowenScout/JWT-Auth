const User = require('./lib/user.js');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const getHeader = require('./lib/getHeader.js');

module.exports = (req, res, next) => {
  req.user = req.user || {};
  let authHeader = getHeader(req, next);

  let verified = jwt.verify(authHeader.token, process.env.SECRET || 'change this')

  User.findOne({uuid: verified['id']}).then(response => {

    if(res) {
      User.findOneAndUpdate({uuid: response.uuid}, {uuid: uuid()}, {new: true}, function (err, res){

        req.user.message('Logout sucessful.');
        next();
      })
    } else {
      req.user.message('Logout unsuccessful.');
      next();
    }
  })
};
