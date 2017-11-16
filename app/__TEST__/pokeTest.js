'use strict';

//process.env.TEST_DB = 'mongodb://localhost:27017/pokemon_test';

const request = require('superagent');
const mongoose = require('mongoose');
const Pokemon = require(__dirname + '/../models/pokeGen.js');
const pokeRouter = require(__dirname + '/../routes/pokeRouter.js');
const server = require(__dirname + '/../lib/server.js');

server.listen(3000);

const url = 'http://localhost:3000/api/v1/pokemon';

const ditto = {
  pokemon: 'ditto',
  item: 'leftovers',
  ability: 'imposter',
  moveSet: 'transform'
};
