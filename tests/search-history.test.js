//api routes tests
const request = require('supertest');
const app = require('../app');


describe("/search", () => {
  it("should return a 404", (done) => {
    request(app)
      .get("/search")
      .expect(404)
      .then(() => done())
      .catch(err => done(err));
  });
});