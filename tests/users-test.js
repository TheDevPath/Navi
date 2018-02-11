// api routes tests
const request = require('supertest');
const app = require('../app');
const server = require('../server');
const config = require('../config');

// /Use for server requests
const respond = request.agent(server.listen(config.PORT));


const {
  users, populateUsers, deleteTestUser, stopServer,
} = require('./seed/seed');


beforeEach(populateUsers);
afterEach(deleteTestUser);
afterEach(stopServer);

describe('API Routes', () => {
  describe('GET /users/user', () => {
    it('does not send a user if not logged in', async () => {
      try {
        const res = await request(app)
          .get('/users/user')
          .expect(401);

        expect(res).to.be.an('object');
      } catch (error) {
        throw error;
      }
    });
    it('Sends the requested user when they exist', async () => {
      try {
        await request(app)
          .get('/users/user')
          .set('x-access-token', users[0].tokens[0].token)
          .expect(200)
          .expect((res) => {
            expect(res.body._id).to.equal(`${users[0]._id}`);
          });
      } catch (err) {
        throw err;
      }
    });
  });
  // /register- POST
  // valid email, password, and doesn't exist already
  // /User will need to be deleted after test?
  // valid email and password, but exists already
  // invalid email and try to create
  // invalid password and try to create
  describe('POST users/register', () => {
    it('succesfully creates a new user', () => {
      try {
        respond.get('users/register')
          .send({
            name: 'Taco Test',
            email: 'test@testing.com',
            password: 'passcode',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.auth).to.be(true);
          });
      } catch (err) {
        throw err;
      }
    });
    it('User already exists', () => {
      try {
        respond.get('users/register')
          .send({
            name: users[0].name,
            email: users[0].email,
            password: users[0].password,
          })
          .expect(409)
          .expect((res) => {
            expect(res.body).to.equal('Email already in use.');
          });
      } catch (err) {
        throw err;
      }
    });

  });

  // /login - POST
  // apiSuccess 200 { auth: true, token: token } jsonwebtoken.
  // apiError 400 { request error } User not found.
  // apiError 401 { auth: false, token: null } Invalid password.
  // apiError 500 { server error } Problem finding user.

  // /logout - GET
  //  apiSuccess 200 { auth: false, token: null }
});
