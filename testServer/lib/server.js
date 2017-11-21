'use strict';

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = require('express')();

app.use(require(__dirname + '/routes.js'));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500 || err.statusCode).send(err.message || 'server error');
});

module.exports = {
  start: () => {
    return new Promise((resolve,reject) => {

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server up on port: ${process.env.PORT || 3000}`);
        resolve();

      });
    })
      .then(() => {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/users', {useMongoClient: true});

      });
    },

  stop: () => {
    return new Promise((resolve, reject) => {

      server.close(() => {
        console.log('server has been shut down');
        resolve();

      });
    })
      .then(() => mongoose.disconnect());

  },
}
