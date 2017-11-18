'use strict';

const jwt = require('jsonwebtoken');
const User = require('./lib/user.js');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
// require('dotenv').config();


module.exports = (req, res, next) => {
console.log('Signing Testing');
  req.user = {};
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
         //make token
           req.user.token = jwt.sign({id: response.uuid}, process.env.SECRET || 'change this');
           console.log(req.user);
          next();
       } else {
         req.user.authenticated = res;
       }
      //  next();
     });
    // if (response.password === authObject.password) {
    //   res.user = {message: '', token: ''};
    //   next();
    // }
    //



    next();
  } else {
    //muy mal
    console.log('err');
  }

});


//
//
//   //   req.user = {
//   //   //   //authenticate
//   //   // //   if (!user) next (err: 403);
//   //   // //   if (!user.username) next (err: 404);
//   //   // //   if (!user.password) next (err: 404);
//   //   // //   next();
//   //   // //   //message
//   //   // //   if (req.user = req.user.db) {
//   //   // //     //if the user matches the user in the db
//   //   // //   return message: `Welcome + ${req.user.username}!`
//   //   // // } else {
//   //   // //   return err: 404
//   //   // // }
//   //   // //   //token
//   //   //
      // req.parseJWT = {};
      // if (typeof req.headers.authorization ==== 'undefined') {
      //   req.parseJWT.message = 'No headers.';
      // } else {
      //   let token = req.headers.authorization.split('Bearer ')[1] || null;
      //     try {
      //       let verified = jwt.verify(token , process.env.SECRET || 'change this') || null;
      //     req.parseJWT.verified = verified.id;
      //   } catch (err) {
      //     req.parseJWT.verified = false;
      //   }
      // }
//   //   //   return req;
//   //   //
//   //   //   //user
//   // })
//
// //if correct, generate just token
// //use uuid of user
//
// }
next();
};
