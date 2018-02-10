// api routes tests
const request = require('supertest');

const app = require('../app');

describe('API Routes', () => {
  describe('GET /api/users/current', () => {
    it('does not send a user if not logged in', async () => {
      try {
        const res = await request(app)
          .get('/api/users/current')
          .expect(401);
        
        expect(res).to.be.an('object')
      } catch (error) {
        throw error;
      }
    })
  })
})
