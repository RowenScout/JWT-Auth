'use strict';

const expect = require('expect');
const app = require('../testServer/lib/server.js');
const request = require('superagent');
const User = require('../lib/user.js');

let username = 'username';
let password = 'password';
let newPassword = 'newPassword';
let badUser = 'bubsy-3d'

describe('Testing a user updating their password', (done) => {
  before((done) => {
    app.start();
    request.get('localhost:3000/signup').auth(username, password)
     .then(() => {
        done();
    });
  });

  after((done) => {
      app.stop();
      User.remove({username: username})
       .then(() => {
          done();
      });
  });

  it('Should send message "Username does not exist!" when posting an update to a non-extant user', function(done) {
    request.get(`localhost:${process.env.PORT || 3000}/update`).auth(`${badUser}:${password}:${newPassword}`)
    .then(response => {
     expect(response.body.message).toEqual('Username does not exist!');
       done();
    });
  });

  it('Should send message "New password was not provided." if two passwords are not included', function(done) {
    request.get(`localhost:${process.env.PORT || 3000}/update`).auth(`${badUser}:${password}`)
    .then(response => {
     expect(response.body.message).toEqual('New password was not provided.');
       done();
    });
  });

  it('Should send message "Password Updated" upon creation of new user', function(done) {
    request.get(`localhost:${process.env.PORT || 3000}/update`).auth(`${username}:${password}:${newPassword}`)
    .then(response => {
     expect(response.body.message).toEqual('Password Updated!');
       done();
    });
  });

  // Password should have changed from previous test block so passing
  // username:password should fail at authentication.
  it('Should send message "Authentication failed!" when posting with a bad password', function(done) {
    request.get(`localhost:${process.env.PORT || 3000}/update`).auth(`${username}:${password}:${newPassword}`)
    .then(response => {
     expect(response.body.message).toEqual('Authentication failed!');
       done();
    });
  });

  //this is a signin test so it depends on signin functioning (I'm not mocking Signin here),
  //but should only work if the username was successfully changed by the previous test block.
  it('Should send message "Authentication failed!" when posting with a bad password', function(done) {
    request.get(`localhost:${process.env.PORT || 3000}/update`).auth(`${username}:${password}:${newPassword}`)
    .then(response => {
     expect(response.body.message).toEqual('Authentication failed!');
       done();
    });
  });
});
