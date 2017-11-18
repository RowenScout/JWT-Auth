'use strict';

const express = require('express');
const parser = require('body-parser');
const router = module.exports = express.Router();
const jwtAuth = require('../../index.js');

// signup
router.get('/signup', jwtAuth().signup, (req, res, next) => {
  // our function will attach a user object to req. so req.user = {}; 
  // need to decide what needs to happen in the function and what req.user should look like when finished
  res.send("Hello Larry");
  next();
});

// signin

// logout

// updateUser