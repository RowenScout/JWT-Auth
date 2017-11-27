'use strict';

const express = require('express');
const parser = require('body-parser');
const router = module.exports = express.Router();
const jwtAuth = require('../../index.js');

// signup
router.get('/signup', jwtAuth.signup, (req, res, next) => {
  res.send(req.user);
  next();
});

router.get('/signin', jwtAuth.signin, (req,res,next) => {
  res.send(req.user);
  next();
});

router.get('/logout', jwtAuth.logout, (req, res, next) => {
  res.send(req.user);
  next();
});

router.get('/update', jwtAuth.update, (req, res, next) => {

  res.send(req.user);
  next();
});
