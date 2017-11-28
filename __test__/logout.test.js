'use strict';

const expect = require('expect');
const User = require('../lib/user.js');
const app = require('../testServer/lib/server.js');
const request = require('superagent');

const username = 'username';
const password = 'password';
let jwtTest = '';


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

  it('Should send a mesage that "No bearer token provided with Bearer. Please provide token."', done => {
    request
    .get(`localhost:${process.env.PORT || 3000}/logout`)
    .set('Authorization', `Bearer `)
    .then(response => {
      expect(response.body.message).toEqual("No bearer token provided with Bearer. Please provide token.");
      done();
    });
  });

  it('Should send a mesage that "No auth header provided."', done => {
    request
    .get(`localhost:${process.env.PORT || 3000}/logout`)
    .set('Authorization', ` `)
    .then(response => {
      expect(response.body.message).toEqual("No auth header provided.");
      done();
    });
  });

  it('Should send a mesage that Please provide a jwt token with the format: Bearer yourTokenHere', done => {
    request
    .get(`localhost:${process.env.PORT || 3000}/logout`)
    .set('Authorization', 'Bearer undefined')
    .then(response => {
      expect(response.body.message).toEqual("Please provide a jwt token with the format: 'Bearer yourTokenHere'");
      done();
    });
  });

  //logout successful test
  it('Should send message "Account Created" upon creation of new user', function(done) {
        request.get(`localhost:${process.env.PORT || 3000}/signup`).auth(username, password).then(response => {
                  // successful response
         expect(response.body.message).toEqual('Account Created.');
           done();
        });
      });
  it('Should send message "Signed in successfully!" upon signin', function(done) {
          request.get(`localhost:${process.env.PORT || 3000}/signin`).auth(username, password).then(response => {
          jwtTest = response.body.token;
         expect(response.body.message).toEqual('Signed in successfully!');
           done();
        });
      });
  it('Should send message "Logout successful." upon logout', function(done) {
    request
    .get(`localhost:${process.env.PORT || 3000}/logout`)
    .set('Authorization', `Bearer ${jwtTest}`)
    .then(response => {
         expect(response.body.message).toEqual('Logout successful.');
           done();
        });
      });

      it('Sending the same token after logout should not work', function(done) {
        request
        .get(`localhost:${process.env.PORT || 3000}/logout`)
        .set('Authorization', `Bearer ${jwtTest}`)
        .then(response => {
             expect(response.body.message).toEqual('Logout unsuccessful.');
               done();
            });
          });


  it('Should send message "Unable to verify token."', function(done) {
    request
    .get(`localhost:${process.env.PORT || 3000}/logout`)
    .set('Authorization', 'Bearer whatever')
    .then(response => {
         expect(response.body.message).toEqual("Unable to verify token.");
           done();
        });
      });
});
