'use strict';

// This helper function attaches a message to req.user.message
// It is useful for attaching messages in the event of errors.
// It accepts the req, attaches your message to it, and then calls next(), forcing
// express to ignore the rest of the code that would normally run if there was no error.
// Function example: "return reqMessage(req, "your message here", next);"
// Writing it this way will stop all code after it.

module.exports = (req, message, next) => {
    req.user.message = message;
    return req, next();
};
