'use strict';

const expect = require('expect');
const app = require('../testServer/lib/server.js');
const request = require('superagent');
const User = require('../lib/user.js');

let username = 'username';
let password = 'password';

describe('Should test all available callbacks from signin.js', done => {
    before(done => {
      app.start();
        User.remove({username: username}).then(() => {
            done();
        });
    });

    after(done => {
        app.stop();
        done();
    });

    it('Should send message "Account Created" upon creation of new user', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signup`).auth(username, password).then(response => {
                // successful response
       expect(response.body.message).toEqual('Account Created.');
         done();
      });
    });
    it('Should send message "Signed in successfully!" upon signin', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, password).then(response => {
                // successful response
       expect(response.body.message).toEqual('Signed in successfully!');
         done();
      });
    });
    it('Should send message "Authentication failed!" when password does not match', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, "David").then(response => {
                // unsuccessful response
       expect(response.body.message).toEqual('Authentication failed!');
         done();
      });
    });
    it('Should send message "Username does not exist!" when username does not exist', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signin`).auth("user", password).then(response => {
        expect(response.body.message).toEqual('Username does not exist!');
        done();
      });
    });
});

describe('Should prevent Brute force attacks.', done => {
    before(done => {
      app.start();
        User.remove({username: username}).then(() => {
            done();
        });
    });

    after(done => {
        app.stop();
        done();
    });

    it('Should send message "Account Created" upon creation of new user', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signup`).auth(username, password).then(response => {
                // successful response
       expect(response.body.message).toEqual('Account Created.');
         done();
      });
    });
    it('Should prevent a user from logging in after 3 unsuccessful attempts', function(done) {
      request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, 'david').then(response => {
       expect(response.body.message).toEqual('Authentication failed!');
       done();
       request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, 'david').then(response => {
        expect(response.body.message).toEqual('Authentication failed!');
        done();
        request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, 'david').then(response => {
         expect(response.body.message).toEqual('Authentication failed!');
         done();
         request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, 'david').then(response => {
          expect(response.body.message).toEqual('Account timed out');
          done();
         });

        });

       });

      });

    });

});
