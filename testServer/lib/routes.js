'use strict';

const express = require('express');
const parser = require('body-parser');
const router = module.exports = express.Router();
const jwtAuth = require('../../index.js');

// signup
router.get('/signup', jwtAuth().signup, (req, res, next) => {
  console.log(req.user);
  // our function will attach a user object to req. so req.user = {};
  // need to decide what needs to happen in the function and what req.user should look like when finished
  res.send(req.user);
  next();
});

// signin
router.get('/signin', jwtAuth().signin, (req,res,next) => {
  res.send(req.user);
  next();
});
// logout

// updateUser
