const User = require('../lib/user.js');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const reqMessage = require('../lib/reqMessage');
const getHeader = require('../lib/getHeader.js');

module.exports = (_this, req, res, next) => {
  
  // standard functions to check headers are correct. If a message is set we know there is an error and we stop the module
  req.user = req.user || {};
  let authHeader = getHeader(req, next);
  if (req.user.message) return req, res, next();

  try {
    let verified = jwt.verify(authHeader.token, process.env.SECRET || 'change this');
    User.findOne({uuid: verified['id']}).then(response => {
      if(response) {
        User.findOneAndUpdate({uuid: response.uuid}, {uuid: uuid()}, {new: true}, function (err, res){

          req.user.message = 'Logout successful.';
          next();
        })
      } else {
        req.user.message = 'Logout unsuccessful.';
        next();
      }
    })

} catch  (err) {
  return reqMessage(req, 'Unable to verify token.', next);
}

};
