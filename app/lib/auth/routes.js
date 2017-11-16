'use strict';

const express = require('express');
const parser = require('body-parser');
const User = require('../model/user.js');
const router = module.exports = express.Router();

//sign up
router.post('/users', (req, res, next) => {
  if( !req.body.username) return new Error(error)
  if( !req.body.password) return new Error(error)

  new User(req.body).save();
  .then(res.send('success message'))
  .catch(err => next({err}))
})

//verify that req has username
//verify that req has password

//pass req into user constructor

//now this is where I get lost.

//does the user model have code that update the user in mongodb,
//or does the route handle that?

//send res with user that was just created

//delete
router.delete('/users:id', (req, res, next) => {
  if(!req.params.id) return new Error('no id was specified.')
  User.remove({_id:req.params.id})
  .then(res.send('success message'))
  .catch(err => next({error:err, status:400}))
})

//update
router.put('/users/:id', (req, res, next) => {
  if(!req.params.id) return new Error('no id was specified.')
  User.findOneAndUpdate(_id:req.params.id}, req.body)
  .then(res.send('success message'))
  .catch(err => next({error:err, status:404}))
})

//config
//???  User.findOneAndUpdate(_id:req.params.id}, req.body)
router.verb('string' (req, res, next) => {
  //sets up server?
  //establish defaults using config object.
})

//login
router.put('/users/:id'(req, res, next) => {
  if(!req.params.id) return new Error('no id was specified.')
  //update uuids
  //send success message
  //catch error

})

//logout
router.put('/users/:id'(req, res, next) => {
  if(!req.params.id) return new Error('no id was specified.')
  //update uuids
  //send success message
  //catch error

})
