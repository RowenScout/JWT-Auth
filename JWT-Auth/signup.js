'use strict';

const User = require('./model/user.js');

// const create = require('./create.js');

module.exports = (req, res, next) => {

    //Refactor this bit so that it lives in a helper function that we
    //require in.
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
    const user = new User(authObject);

    User.findOne({username: authObject['username']}).then(response => {
        if (response) {
            req.user = {message: "Already Exists"};
            next();
        } else {
            user.hashify(authObject['password']).then(hash=> {
                user.password = hash.password;
                user.uuid = hash.uuid;
                user.save().then(response => {
                    req.user = {message: "Account Created"};
                    next();
                });
            });
        }
    });
};
