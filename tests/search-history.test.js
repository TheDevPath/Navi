//api routes tests
const request = require('supertest');
const app = require('../app');
const { populateUsers, users, populateSearchHistory, stopServer, search_history } = require("./seed/seed");
const user = users[0];

beforeEach(populateUsers);
beforeEach(populateSearchHistory);

describe("/search", () => {
  it("should return a 404", (done) => {
    request(app)
      .get("/search")
      .expect(404)
      .then(() => done())
      .catch(err => done(err));
  });
});

describe("Saved search history end points", () => {
  describe("GET /search/history", done => {
    it("should return search history of valid user id", () => {
      request(app)
        .get("/search/history")
        .set('x-access-token', users[0].tokens[0].token)
        .expect(200)
        .expect(res => {
          console.log("response.body: ", res.body);
        })
        .end(done)
        // .catch(err => done(err));
        // .expect(res => {
        //   const { searchHistory } = res.body;
        //   expect(searchHistory).to.deep.include(search_history);
        // }).end((err, res) => {
        //   if (err) done(err);
        //   done();
        // });
    });
  });
});