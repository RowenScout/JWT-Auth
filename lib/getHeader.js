'use strict';

// This helper function:
//  Searches req.headers.authentication
//  Sends messages via req.user.message if any error is detected.
//  Errors can be:
//  1. No req.headers.authorization
//  2. One or No pieces of login information provided alongside Basic username:password
//  3. No JWT provided alongside Bearer yourTokenHere
//
//  Otherwise, function will return an object containing:
//  1. For Basic authentication: {username: username, password: password}
//  2. For Bearer authentication: {token: tyourTokenHere}


const reqMessage = require('./reqMessage.js');

module.exports = (req, next) => {
    let authObject = {};
    let authHeader = req.headers.authorization || false;
    if (!authHeader) return  reqMessage(req, 'No auth header provided.', next);


    let authType = authHeader.split(' ');
    if (authType[0] === 'Basic') {
        let base64 = authType[1];
        let base64Buffer = new Buffer(base64, 'base64');
        let stringHeader = base64Buffer.toString();
        let authArray = stringHeader.split(':');;
        if((authArray[0] === '') || (authArray[1] === '')) return reqMessage(req, 'Please send both username and password.', next);
       authObject = {
          username: authArray[0],
          password:authArray[1],
          newPassword:authArray[2]
        };

    } else {
        if (authType[0] !== 'Bearer') return reqMessage(req, 'No bearer token provided. Please provide token.', next);
        if (authType[1] === '') return reqMessage(req, 'No bearer token provided with Bearer. Please provide token.', next);
        if (authType[1] === 'undefined') return reqMessage(req, "Please provide a jwt token with the format: 'Bearer yourTokenHere'" , next);
        authObject = {token: authType[1]};
    }
    return authObject;
};
