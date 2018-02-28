// api routes tests
const request = require('supertest');
const app = require('../app');

const {
  users, populateUsers, deleteTestUser, stopServer,
} = require('./seed/seed');


beforeEach(populateUsers);
afterEach(deleteTestUser);
afterEach(stopServer);

describe('/Users API Routes', () => {
  describe('GET /users/user', () => {
    it('does not send a user if not logged in', (done) => {
      request(app)
        .get('/users/user')
        .expect(401)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        },
        );
    });
    it('Sends the requested user when they exist', (done) => {
      request(app)
        .get('/users/user')
        .set('x-access-token', users[0].tokens[0].token)
        .expect(200)
        .then((res) => {
          expect(res.body._id).to.equal(`${users[0]._id}`);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  // /register- POST
  // valid email, password, and doesn't exist already

  describe('POST users/register', () => {
    it('succesfully creates a new user', (done) => {
      request(app)
        .post('/users/register')
        .send({
          name: 'Taco Test',
          email: 'test@testing.com',
          password: 'passcode!1',
        })
        .expect(200)
        .then((res) => {
          expect(res.body.auth).to.equal(true);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    // valid email and password, but exists already
    it('Wont create a new user if email address already exists', (done) => {
      try {
        request(app)
          .post('/users/register')
          .send({
            name: users[0].name,
            email: users[0].email,
            password: users[0].password,
          })
          .expect(409)
          .expect((res) => {
            expect(res.body).to.equal('Email already in use.');
          });
        done();
      } catch (err) {
        done(err);
      }
    });
    // invalid email and try to create
    it('Wont create user with invalid email', (done) => {
      try {
        request(app)
          .post('/users/register')
          .type('form')
          .send({
            name: 'Taco Test',
            email: 'badtestemail',
            password: 'passcode',
          })
          .expect(400)
          .expect((res) => {
            expect(res.body).to.equal('Email is not of the valid format');
          });
        done();
      } catch (err) {
        done(err);
      }
    });
    // invalid password and try to create
    it('Wont create user with invalid password', (done) => {
      try {
        request(app)
          .post('/users/register')
          .type('form')
          .send({
            name: 'Taco Test',
            email: 'testing@test.com',
            password: '0',
          })
          .expect(400)
          .expect((res) => {
            expect(res.body).to.equal('Password should have minimum length of 6 & it should have atleast one letter, one number, and one special character');
          });
        done();
      } catch (err) {
        done(err);
      }
    });

  });


  // /login - POST
  // apiSuccess 200 { auth: true, token: token } jsonwebtoken.
  describe('POST /users/login', () => {
    it('Successfully logs the user in', (done) => {
      try {
        request(app)
          .post('/users/login')
          .send({
            email: users[0].email,
            password: users[0].password,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).to.equal({ auth: true, token: users[0].tokens.token });
          });
        done();
      } catch (err) {
        done(err);
      }
    });
    // apiError 400 { request error } User not found.
    it('Should send 404 if user is not found', (done) => {
      try {
        request(app)
          .post('/users/login')
          .send({
            email: 'gibberish@gmail.com',
            password: users[0].password,
          })
          .expect(404)
          .expect((res) => {
            expect(res.body).to.equal('No user found.');
          });
        done();
      } catch (err) {
        done(err);
      }
    });
    // apiError 401 { auth: false, token: null } Invalid password.
    it('Should send 401 if user has invalid password', (done) => {
      try {
        request(app)
          .post('/users/login')
          .send({
            email: users[0].email,
            password: 'badpassword',
          })
          .expect(401)
          .expect((res) => {
            expect(res.body).to.equal({ auth: false, token: null });
          });
        done();
      } catch (err) {
        done(err);
      }
    });
    // apiError 500 { server error } Problem finding user.
  });

  // /logout - GET
  describe('GET /users/logout', () => {
    //  apiSuccess 200 { auth: false, token: null }
    it('Should send 200 if logout is successful', (done) => {
      try {
        request(app)
          .get('/users/logout')
          .set('x-access-token', users[0].tokens[0].token)
          .expect(200)
          .expect((res) => {
            expect(res.body).to.equal({ auth: false, token: null });
          });
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
