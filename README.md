# JWT-Auth
Authentication/Authorization module for node. Written in javascript.

### Sign in

To include signin, attach as follows:

```
app.get('/signin', jwtAuth.signin, (req, res, next) => {

  });
```
'Sign in' will take in a username and password from the user, compare this against the user information contained in the db, and return a message indicating success or failure.

Additionally, signin will help prevent against brute force attacks. A user will be locked out after 3 incorrect attacks. The user will remain in a lockout status for 5 minutes following the 3rd attempt.

Sign In will send the following information within the req.user.message:

"Signed in successfully!"-> You signed in successfully!
"Authentication failed!"-> You have sent in an incorrect username or password.
"Account timed out."-> You have entered in an incorrect username or password 3 or more times.
"Account unlocked. Please try to login again." -> Your account is now unlocked.
"Username does not exist!" -> You have sent a username that does not exist in the DB.
