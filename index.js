'use strict';

const _signup = require('./modules/signup');
const _signin = require('./modules/signin');
const _logout = require('./modules/logout');
const _update = require('./modules/update');

const jwt_auth = function(req, res, next) {
    this._config = {message: 'testing'};
    this._attemptedLogin = {};

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
