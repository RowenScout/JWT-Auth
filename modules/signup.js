const User = require('../lib/user.js');
const getHeader = require('../lib/getHeader.js');


module.exports = (_this, req, res, next) => {
    req.user = req.user || {};
    let authHeader = getHeader(req, next);
    if (req.user.message) return req, res, next();
    
    const newUser = new User(authHeader);
    User.findOne({username: authHeader['username']}).then(response => {
        if (response) {
            req.user.message = "Account already exists.";
            next();
        } else {
            newUser.hashify(authHeader['password']).then(hash=> {
                newUser.password = hash.password;
                newUser.uuid = hash.uuid;
                newUser.save().then(response => {
                    req.user.message = "Account Created.";
                    next();
                });
            });
        }
    });
};
