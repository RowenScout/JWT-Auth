'use strict';

const config = require('config');
const signup = require('signup');
const signin = require('signin');
const logout = require('logout');
const update = require('update');


module.exports = (req, res, next) => {
    let config = {};
    // detect here what the dev is trying to do with the req varaible and run the correct function that we imported above. return information in req.user {};
    
    req.user = {};

    // you will need to write each of these functions so they are callable by the user or by the code you write above.
    return {
        config: config(),
        signup: signup(),
        signin: signin(),
        logout: logout(),
        update: update()
    }
    // not sure if this next needs to be here.
    next();
};