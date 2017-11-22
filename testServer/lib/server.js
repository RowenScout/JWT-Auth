'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('express')();

app.use(require(__dirname + '/routes.js'));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500 || err.statusCode).send(err.message || 'server error');
});

let http = null;
let isRunning = null;


module.exports = {
  start: () => {

    http = app.listen(process.env.PORT || 3000, () => {
        isRunning = true;
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/users', {useMongoClient: true});   
      });
    },

  stop: () => {
    http.close(() => {
      mongoose.disconnect();
      http = null;
      isRunning = false;
      return;
    });
  },
}
