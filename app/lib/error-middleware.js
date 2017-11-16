'use strict';

const errorHandler = (err, req, res, next) => {

  res.status(err.status).send(err.message);
  next();

};

module.exports = errorHandler;
