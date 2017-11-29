# JWT-Auth
Authentication/Authorization module for node. Written in javascript.

### How to Use JWT-Auth

Let's begin by including our module: 
```
  const jwtAuth = require('jwt-auth');
```

JWT-Auth has four exportable functions: signup, signin, update, and logout. To include the functions, add them as route middleware on the routes you wish have authenticated.

All responses by JWT-auth will be stored in the req.user object. 

#### Sign Up

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
```

The hash will send the username:password of the user.
Sign Up will send the following information within the req.user.message :

"No auth header provided." -> You have failed to send information within the request.headers.authorization object.
"Please send both username and password." -> Either the username or password was missing. Please send them in the format username:password.
"Account Created." -> The user has successfully created an account and it is stored in the database.
"Account already exists." -> This user already exists in the database.

To include signin, attach as follows:
```
app.get('/signin', jwtAuth.signin, (req, res, next) => {

  });
The hash will send the username:password of the user. 
```

Sign Up will send the following information within the req.user.message :


* "No auth header provided."                -> You have failed to send information within the request.headers.authorization object.
* "Please send both username and password." -> Either the username or password was missing. Please send them in the format username:password.
* "Account Created."                        -> The user has successfully created an account and it is stored in the database.
* "Account already exists."                 -> This user already exists in the database. 

#### Sign in

To include signin, attach as follows:

```
app.get('/signin', jwtAuth.signin, (req, res, next) => {

  });
```
'Sign in' will take in a username and password from the user, compare this against the user information contained in the db, and return a message indicating success or failure.

Additionally, signin will help prevent against brute force attacks. A user will be locked out after 3 incorrect attacks. The user will remain in a lockout status for 5 minutes following the 3rd attempt.

Sign In will send the following information within the req.user.message:


* "Signed in successfully!"-> You signed in successfully! "Authentication failed!"-> You have sent in an incorrect username or password. "Account timed out."-> You have entered in an incorrect username or password 3 or more times. "Account unlocked. Please try to login again." -> Your account is now unlocked. "Username does not exist!" -> You have sent a username that does not exist in the DB.
* "Account timed out."-> You have entered in an incorrect username or password 3 or more times.
* "Account unlocked. Please try to login again." -> Your account is now unlocked.
* "Username does not exist!" -> You have sent a username that does not exist in the DB.

#### Update

Update allows passwords to be changed by the user.

To incude update, attach as follows:

```
app.get('/update', jwtAuth.update, (req, res, next) => {
  // req.user.message contains information from update
});
Update works very similarly to SignIn but takes both old password and new password and should be sent in this format:

username:password:newPassword
```
Update will send the following information within the req.user.message :

* "No auth header provided."                -> You have failed to send information within the request.headers.authorization object.
* "Authentication failed!" ->      The password was incorrect for that user.
* "Password Updated!"                        -> The user has successfully update their password and it is stored in the database.
* "New password was not provided."          -> Both new and old passwords were not sent.

#### Logout

Logout allows the user to logout from the middleware.

```
To include logout, attach:
router.get('/logout', jwtAuth.logout, (req, res, next) => {
});

Logout takes a bearer token.
```

The Logout module accepts the request to log the user out after the user has successfully signed up and signed into the application.

Logout will send the following information within the req.user.message :
* No bearer token provided with Bearer. Please provide token.
* No auth header provided. -> No Authorization provided. Example: Authorization: Bearer 12345
* Please provide a jwt token with the format: 'Bearer yourTokenHere'
* Account Created. -> Account created with Signup module.
* Signed in successfully! -> User signed in with Signin module.
* Unable to verify token. -> Unable to verify Bearer token. Example: Bearer whatever, whatever is not verified.
