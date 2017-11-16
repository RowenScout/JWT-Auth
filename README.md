# JWT-Auth
Authentication/Authorization module for node. Written in javascript.

============================MVP Notes===============================
Things to do
- Write use cases prior to coding.
- Rowen Suggestion: Create variable that stores each error. One that contains each in an object.


MVP
* Basic middleware that handles user authentication for login, logout, signup, update.
* Mongoose for storing users db that we control
* Each function callable on its own
* Fully tested 100%
* Full docs w/ pretty middleware

Stretch Goals
* Secure req and res objects.
* Stop brute force
* HTTP - > HTTPS redirect
* Complete DEV customization
* SQL/Mongoose Custom DB locations


module.exports = (req, res, next) => {
  req.user j= {};
    //examine req and determine what to do.
    //secure req and res
    //stop brute force attacks

return {
	signup()
	config()
	login()
	logout()
	update()
  }
}
====================================================================
