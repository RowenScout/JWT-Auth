'use strict';

const config = require('./JWT-Auth/config');
const signup = require('./JWT-Auth/signup');
const signin = require('./JWT-Auth/signin');
const logout = require('./JWT-Auth/logout');
const update = require('./JWT-Auth/update');


module.exports = (req, res, next) => {


    // import this file and call testing().function()
    return {
        "config": config,
        "signup": signup,
        "signin": signin,
        "logout": logout,
        "update": update
    }
};
