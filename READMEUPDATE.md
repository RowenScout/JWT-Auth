#### Update

Update allows passwords to be changed by the user.

To incude update, attach as follows:

```
app.get('/update', jwtAuth.update, (req, res, next) => {
  // req.user.message contains information from update
});
```

Update works very similarly to SignIn but takes both old password and new password and should
be sent in this format:

```
username:password:newPassword
```

Update will send the following information within the req.user.message :


```
* "No auth header provided."                -> You have failed to send information within the request.headers.authorization object.
* "Authentication failed!" ->      The password was incorrect for that user. 
* "Password Updated!"                        -> The user has successfully update their password and it is stored in the database.
* "New password was not provided."          -> Both new and old passwords were not sent.
