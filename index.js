'use strict';

const signup = require('./signup');
const signin = require('./signin');
const logout = require('./logout');
const update = require('./update');


module.exports = (req, res, next) => {
    return {
        signup,
        signin,
        logout,
        update
    }
};