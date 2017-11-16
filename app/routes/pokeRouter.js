'use strict';

//write if/else blocks to handle errors.

const express = require('express')
const parse = require('body-parser')
const Pokemon = require(__dirname + '/../models/pokeGen.js')
const pokeRouter = module.exports = express.Router();

//gets all the pokemon
pokeRouter.get('/pokemon', (req, res, next) => {
  //finds all pokemon since they're all objects.
  Pokemon.find({})
  //binding here to prevent a contextual error.
    .then(res.send.bind(res))
    .catch(err => next({err}))
});

//gets just one pokemon
pokeRouter.get('/pokemon/:id', (req, res, next) => {
  //using the findOne method from express and passing in
  //the id object.
  pokeRouter.findOne({id: req.params.id})
    .then(res.send.bind(res))
    .catch(err => next({err}))
});

//make a new pokemon with post
pokeRouter.post('/pokemon/:id', jsonParser, (req, res, next) =>
  if(!req.body.name)
    return rest.status(400).send('couldn\'t find that pokemon D:'));

  new Pokemon(req.body).save()
    .then(res.send.bind(res));
    .catch(err => next({error: err, status: 400}))
}
//update one of your pokemon with put
pokeRouter.put('/pokemon/:id', jsonParser, (req, res, next) =>
  Pokemon.findOneAndUpdate({_id: req.params.id}, req.body)
  .then(res.send('pokemon updated! :D'))
  .catch(err => next({error: err}));
}
//delete a pokemon
pokeRouter.delete('/pokemon/:id', jsonParser, (req, res, next) =>
  Pokemon.remove({_id:req.params.id})
  .then(res.send('pokemon was released into the wild.'))
  .catch(err => next({status: 500, message: 'server error', error:err}))
}
