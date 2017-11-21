'use strict';

const config = require('./config');
const signup = require('./signup');
const signin = require('./signin');
const logout = require('./logout');
const update = require('./update');
if (!process.env.JWT_SECRET) {
    // allow dev to create their own secret if they want
    const secret = require('./lib/secretGenerator.js');
}

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