'use strict';

const SignUp = require('./signup.js')
const User = require('./lib/user.js')
const router = module.exports = express.Router();

module.exports = (req, res, next) => {
    console.log("Signin Testing");

      let base64 = authHeader = req.headers.authorization;
      let base64Buffer = new Buffer(base64, 'base64');
      let stringHeader = base64Buffer.toString();
      let authArray = stringHeader.split(':');
      let authObject = {
        username: authArray[0],
        password:authArray[1]
      };

//take username/password from header
router.get('/signin', jwtAuth().signin, (req,res,next)) => {

//autheniticate
// User.findOne({authObject})
// {username: req.user.username
// or authObject
User.findOne({username: authObject['username']}).then(response => {
  if (response) {
    req.user = {
      //authenticate
      if (!user) next (err: 403);
      if (!user.username) next (err: 404);
      if (!user.password) next (err: 404);
      next();
      //message
      if (req.user = req.user.db) {
        //if the user doesn't match the user in the db
      return message: `Welcome + ${req.user.username}!`
    } else {
      return err: 404
    }
      //token
      
      //user
  })

//if correct, generate just token
//use uuid of user

}
};
