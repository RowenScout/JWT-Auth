# JWT-Auth
Authentication/Authorization module for node. Written in javascript.

## How to Use JWT-Auth

Let's begin by including our module: 
```
  const jwtAuth = require('jwt-auth');
```

JWT-Auth has four exportable functions: signup, signin, update, and logout. To include the functions, add them as route middleware on the routes you wish have authenticated.

All responses by JWT-auth will be stored in the req.user object. 

### Sign Up

To incude signup, attach as follows: 

```
app.get('/signup', jwtAuth.signup, (req, res, next) => {
  // req.user.message contains information from signup
});
```

Sign up will check the request headers for Basic authorization under the authorization header. See the below wiki page, under client-side, for a TL;DR introduction to the process:

```
https://en.wikipedia.org/wiki/Basic_access_authentication

In general, the header will look like the following:

Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l

The hash will send the username:password of the user. 
```

Sign Up will send the following information within the req.user.message :

```
* "No auth header provided."                -> You have failed to send information within the request.headers.authorization object.
* "Please send both username and password." -> Either the username or password was missing. Please send them in the format username:password.
* "Account Created."                        -> The user has successfully created an account and it is stored in the database.
* "Account already exists."                 -> This user already exists in the database. 
```
