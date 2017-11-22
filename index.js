'use strict';

const _signup = require('./signup');
const _signin = require('./signin');
const _logout = require('./logout');
const _update = require('./update');
// need a function here that parses req, res, next. ideally as a promise function so we can await the results

const jwt_auth = function(req, res, next) {
    this._config = {message: 'testing'};
    this.signup = (req, res, next) => {
        return _signup(this._config, req, res, next);
    };

    this.signin = (req, res, next) => {
        return _signin(this._config, req, res, next);
    };

    this.logout = (req, res, next) => {
        return _logout(this._config, req, res, next);
    };

    this.update = (req, res, next) => {
        return _update(this._config, req, res, next);
    };

    this.config = (newConfig) => {
        this._config = newConfig;
    };

    return req, res, next;
}

module.exports = new jwt_auth;