const expect = require('expect');
const User = require('../lib/user.js');
const request = require('superagent');
const app = require('../testServer/lib/server.js');

const testUsername = 'testing123';
const testPassword = 'testing456';


describe('Testing User Signup', done => {
    beforeAll(done => {
        User.remove({username: testUsername}).then(() => {
            app.start();
            done();
        });
    });

    afterAll(() => {
        app.stop();
        done();
    });

    // test sending no auth

    // test sending only one auth

    // test sending correct username:password and creating user

    // test trying to create that user again
});