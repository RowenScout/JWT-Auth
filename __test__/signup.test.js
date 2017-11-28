const expect = require('expect');
const User = require('../lib/user.js');
const request = require('superagent');

const app = require('../testServer/lib/server.js');
const testUsername = 'testing123';
const testPassword = 'testing456';

    describe('', done => {
        before(done => {
            app.start();
            User.remove({username: testUsername}).then(() => {
                done();
            });
        });

        after(done => {
            app.stop();
            done();
        });

        it('Should get a message saying we did not send any credentials', done => {
            request.get('localhost:3000/signup').then(response => {
                expect(response.body.message).toEqual("No auth header provided.");
                done();
            });
        });

        it('Should respond that we only sent one field', done => {
            request.get('localhost:3000/signup').auth(testUsername).then(response => {
                expect(response.body.message).toEqual("Please send both username and password.");
                done();
            });
        });

        it('Should respond that we correctly created an account with testUsername', done => {
            request.get('localhost:3000/signup').auth(testUsername, testPassword).then(response => {
                expect(response.body.message).toEqual("Account Created.");
                done();
            });
        });

        it('Should respond with an error that we already have a user called testUsername', done => {
            request.get('localhost:3000/signup').auth(testUsername, testPassword).then(response => {
                expect(response.body.message).toEqual("Account already exists.");
                done();
            });
        });

    });
//
