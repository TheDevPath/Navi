//api routes tests
const request = require('supertest');
const app = require('../app');
const { users, userObjectWithToken } = require("./seed/seed");
const SearchHistory = require("../models/search-history");
const { ObjectID } = require("mongodb");
const user = users[0];
const search_history = [
  {
    _id: new ObjectID(),
    query: "paris, france",
    user: user._id
  },
  {
    _id: new ObjectID(),
    query: "london, england",
    user: user._id
  }
];

describe("Saved search history end points", () => {
  let user_no_history = userObjectWithToken({
    name: "john",
    email: "john@example.com",
    password: "password1234"
  });

  let docs;

  beforeEach(() => {
    SearchHistory.remove({})
      .then(() => {
        SearchHistory.insertMany(search_history, (err, _docs) => docs = _docs)
      });
  });

  describe("GET /search/history", done => {

    it("should return search history of valid user id", done => {
      request(app)
        .get("/search/history")
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .end((err, res) => {
          const { searchHistory } = res.body;
          if (err) return done(err);
          for(record of searchHistory) {
            const expected_id = user._id.toHexString();
            expect(record.user).to.equal(expected_id);
          }
          done();
        });
    });

    it("should respond with empty array when user does not have search history", done => {
      request(app)
        .get("/search/history")
        .set('x-access-token', user_no_history.tokens[0].token)
        .expect(200)
        .expect(res => {
          const { searchHistory } = res.body;
          expect(searchHistory).to.be.an('array').that.is.empty;
        })
        .end(done);
    });

    it("should respond with 401 when no token is provided", done => {
      request(app)
        .get("/search/history")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("No token provided.")
          done();
        });
    });

    it("should respond with a 403 error for invalid token", done => {
      request(app)
        .get("/search/history")
        .set('x-access-token', "invalid_token")
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("Failed to authenticate token.");
          done();
        });
    });

  });

  describe("GET /search/history/recent/:num", () => {
    it("should return a 404 when no parameter is given", done =>{
      request(app)
        .get("/search/history/recent/")
        .set('x-access-token', user.tokens[0].token)
        .expect(404)
        .end(done);
    });

    it("should return first entry for a parameter of 1", done => {
      request(app)
        .get(`/search/history/recent/1`)
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          const { searchHistory } = res.body;
          expect(searchHistory).to.be.an('array').that.has.lengthOf(1);
          expect(searchHistory[0].user).to.equal(search_history[0].user.toHexString());
        }).end(done);
    });

    it("should respond with 401 when no token is provided", done => {
      request(app)
        .get("/search/history/recent/1")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("No token provided.")
          done();
        });
    });

    it("should respond with a 403 error for invalid token", done => {
      request(app)
        .get("/search/history/recent/1")
        .set('x-access-token', "invalid_token")
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("Failed to authenticate token.");
          done();
        });
    });
  });

  describe("POST /search/history/:query", () => {
    it("it should update query if it is already in DB", done => {
      let date_before_update = new Date(docs[0].save_date).getTime() / 1000;
      request(app)
        .post("/search/history/paris, france")
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          let { save_date } = res.body.searchHistory;
          save_date = new Date(save_date).getTime() / 1000;
          expect(date_before_update).to.be.below(save_date);
        })
        .end(done);
    });

    it("should create a new entry if query is not found", done => {
      request(app)
        .post("/search/history/some new query")
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          const { searchHistory: { id: id } } = res.body;
          for (let doc of docs) {
            expect(doc._id).to.not.equal(id);
          } 
        })
        .end(done);
    });

    it("should respond with 401 when no token is provided", done => {
      request(app)
        .post("/search/history/query here")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("No token provided.")
          done();
        });
    });

    it("should respond with a 403 error for invalid token", done => {
      request(app)
        .post("/search/history/query here")
        .set('x-access-token', "invalid_token")
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("Failed to authenticate token.");
          done();
        });
    });
  });

  describe("DELETE /search/history", () => {
    it("should clear history of user present in jwt token", done => {
      request(app)
        .delete("/search/history")
        .set('x-access-token', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          const { success } = res.body;
          expect(success).to.equal(true);
        })
        .end((err, res) => {
          if (err) return done(err);

          SearchHistory.find({user: user._id})
            .then(records => {
              expect(records).to.be.an("array").that.has.lengthOf(0);
              done();
            })
            .catch(done);
        });
    });

    it("should respond with 401 when no token is provided", done => {
      request(app)
        .delete("/search/history")
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("No token provided.")
          done();
        });
    });

    it("should respond with a 403 error for invalid token", done => {
      request(app)
        .delete("/search/history")
        .set('x-access-token', "invalid_token")
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          const { message } = res.body;
          expect(message).to.equal("Failed to authenticate token.");
          done();
        });
    });
  });
});