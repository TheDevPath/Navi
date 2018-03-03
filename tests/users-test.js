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
          name: users[2].name,
          email: users[2].email,
          password: users[2].password,
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
      request(app)
        .post('/users/register')
        .send({
          name: users[0].name,
          email: users[0].email,
          password: users[0].password,
        })
        .expect(409)
        .then((res) => {
          expect(res.text).to.equal('Email already in use.');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    // invalid email and try to create
    it('Wont create user with invalid email', (done) => {
      request(app)
        .post('/users/register')
        .send({
          name: users[2].name,
          email: 'badtestemail',
          password: 'passcode',
        })
        .expect(400)
        .then((res) => {
          expect(res.text).to.equal('Email is not of the valid format');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    // invalid password and try to create
    it('Wont create user with invalid password', (done) => {
      request(app)
        .post('/users/register')
        .send({
          name: users[2].name,
          email: 'testing@test.com',
          password: '0',
        })
        .expect(400)
        .then((res) => {
          expect(res.text).to.equal('Password should have minimum length of 6 & it should have atleast one letter, one number, and one special character');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });


  // /login - POST
  // apiSuccess 200 { auth: true, token: token } jsonwebtoken.
  describe('POST /users/login', () => {
    it('Successfully logs the user in', (done) => {
      request(app)
        .post('/users/register')
        .send({
          name: users[2].name,
          email: users[2].email,
          password: users[2].password,
        }).then((res) => {
          request(app)
            .post('/users/login')
            .set('x-access-token', res.body.token)
            .send({
              name: users[2].name,
              email: users[2].email,
              password: users[2].password,
            })
            .expect(200)
            .then((finalRes) => {
              expect(finalRes.body.auth).to.equal(true);
              expect(finalRes.body.token).to.equal(res.body.token);
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
    });
    // apiError 400 { request error } User not found.
    it('Should send 404 if user is not found', (done) => {
      request(app)
        .post('/users/login')
        .set('x-access-token', users[0].tokens[0].token)
        .send({
          email: 'gibberish@gmail.com',
          password: users[0].password,
        })
        .expect(404)
        .then((res) => {
          expect(res.text).to.equal('No user found.');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    // apiError 401 { auth: false, token: null } Invalid password.
    it('Should send 401 if user has invalid password', (done) => {
      request(app)
        .post('/users/login')
        .set('x-access-token', users[0].tokens[0].token)
        .send({
          email: users[0].email,
          password: 'badpassword',
        })
        .expect(401)
        .then((res) => {
          expect(res.body.auth).to.equal(false);
          expect(res.body.token).to.equal(null);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  // /logout - GET
  describe('GET /users/logout', () => {
    //  apiSuccess 200 { auth: false, token: null }
    it('Should send 200 if logout is successful', (done) => {
      request(app)
        .get('/users/logout')
        .set('x-access-token', users[0].tokens[0].token)
        .expect(200)
        .then((res) => {
          expect(res.body.auth).to.equal(false);
          expect(res.body.token).to.equal(null);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
