module.exports = (_this, req, res, next) => {
    req.user.message = 'Failed Login';
    req.user.authenticated = false;

    if (_this._attemptedLogin[req.ip].attempts === 2) {
        _this._attemptedLogin[req.ip].failedDate = new Date().getTime();
    }
    _this._attemptedLogin[req.ip].attempts ++;
    return next();
}