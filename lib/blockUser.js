module.exports = (_this, req, res, next) => {
    let currentDate = new Date().getTime();

    (currentDate - _this._attemptedLogin[req.ip].failedDate < 300000) ? 
        req.user.message = 'Account timed out.':
        delete _this._attemptedLogin[req.ip];

    return req, res, next();
}