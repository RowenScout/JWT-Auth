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

  it('Should get a mesage that the bearer is invalid', done => {
    request.get(`localhost:${process.env.PORT || 3000}/logout`).then(response => {
      expect(response.body.message).toEqual('Bearer invalid');
      done();
    });
  });

  it('Should send message "Logout successful." upon logout', done => {
    request.get(`localhost:${process.env.PORT || 3000}/logout`).then(response => {
      expect(response.body.message).toEqual('Logout sucessful.')
    })
  }



})
