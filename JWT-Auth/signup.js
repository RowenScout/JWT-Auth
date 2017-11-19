const User = require('./lib/user.js');

module.exports = (req, res, next) => {


    let authHeader = req.headers.authorization;
    if (!authHeader) return next(new Error('No auth Header'));

    let base64 = authHeader.split('Basic ')[1];
    let base64Buffer = new Buffer(base64, 'base64');
    let stringHeader = base64Buffer.toString();
    let authArray = stringHeader.split(':');
    let authObject = {username: authArray[0], password: authArray[1]};


    const newUser = new User(authObject);

    User.findOne({username: authObject['username']}).then(response => {
        if (response) {
            req.user = {message: "Already Exists"};
            next();
        } else {
            newUser.hashify(authObject['password']).then(hash=> {
                newUser.password = hash.password;
                newUser.uuid = hash.uuid;
                newUser.save().then(response => {
                    req.user = {message: "Account Created"};
                    next();
                });
            });
        }
    });
};