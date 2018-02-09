// api routes tests
const request = require('supertest');
const app = require('../app');

const {
  users, populateUsers,
} = require('./seed/seed');


beforeEach(populateUsers);

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
        const res = await request(app)
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
});
