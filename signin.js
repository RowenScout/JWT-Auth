'use strict';

const SignUp = require('./signup.js')
const User = require('./lib/user.js')
const router = module.exports = express.Router();

module.exports = (req, res, next) => {
    console.log("Signin Testing");

//take username/password from header

router.get('/signin', jwtAuth().signin, (req,res,next))

//autheniticate
User.findOne({username: req.user.username})
// or authObject
.then(user => {
req.user = {
        //authenticate
        if (!user) next (403)
        //message
        //token
        //user
    })

//if correct, generate just token
//use uuid of user


};