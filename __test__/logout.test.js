'use strict';
const expect = require('expect');
const User = require('../lib/user.js');
const request = require('superagent');
const app = require('../testServer/lib/server.js');
const username = 'username';
const password = 'password';

describe('', done => {
  before (done => {
    app.start();
      User.remove({username: username}).then(() => {
        done();
      });
  });

  after(done => {
    app.stop();
    done();
  });

  it('Should get a mesage that jwt must be provided', done => {
    request.get(`localhost:${process.env.PORT || 3000}/logout`).auth(username, password).then(response => {
      expect(response.body.message).toEqual('jwt must be provided');
      done();
    });
  });

  it('Should send message that Logout sucessful', done => {
    request.get(`localhost:${process.env.PORT || 3000}/signup`).auth(username, password)
    request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, password)
    request.get(`localhost:${process.env.PORT || 3000}/logout`).auth(res.jwt)
    request.get('password')
    .then(response => {
      expect(response.body.message).toEqual('Logout sucessful.')
      done();
    });
  });



});
