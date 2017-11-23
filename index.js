'use strict';

const _signup = require('./signup');
const _signin = require('./signin');
const _logout = require('./logout');
const _update = require('./update');
// need a function here that parses req, res, next. ideally as a promise function so we can await the results

const jwt_auth = function(req, res, next) {
    this._config = {message: 'testing'};
    // any variables you store here under 'this' will be accessable within each function through the '_this' argument.

    this.signup = (req, res, next) => {
       return _signup(this, req, res, next);
    };

    this.signin = (req, res, next) => {
        return _signin(this, req, res, next);
    };

    this.logout = (req, res, next) => {
        return _logout(this, req, res, next);
    };

    this.update = (req, res, next) => {
        return _update(this, req, res, next);
    };

    this.config = (newConfig) => {
        this._config = newConfig;
    };

    return req, res, next;
}

module.exports = new jwt_auth;