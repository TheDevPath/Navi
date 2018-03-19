/* eslint no-underscore-dangle: 0 */
// api routes tests
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../app');
const SavedPins = require('../models/saved-pins');
const {
  pins, populatePins, users, populateUsers, stopServer
} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populatePins);

describe('POST /search/savedpins', () => {
  it('should create new saved pin', (done) => {
    const new_pin = {
      lat: 10,
      lng: 20,
      place_id: 'testing pin1',
      user: users[0]._id
    };
    request(app)
      .post('/search/savedpins')
      .set('x-access-token', users[0].tokens[0].token)
      .send(new_pin)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin.lat).to.equal(new_pin.lat);
        expect(res.body.pin.lng).to.equal(new_pin.lng);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.findOne({lat: 10, lng: 20}).then(receivedPin => {
          expect(receivedPin).to.deep.include(new_pin);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not save a duplicate pin', done => {
    request(app)
      .post('/search/savedpins')
      .set('x-access-token', users[0].tokens[0].token)
      .send(pins[0])
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Duplicate found. Pin not saved.");
        done();
      });
  });

  it('should not create savedPin with invalid body data', (done) => {
    request(app)
      .post('/search/savedpins')
      .set('x-access-token', users[0].tokens[0].token)
      .send({})
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.find().then((savedPins) => {
          expect(savedPins.length).to.equal(pins.length);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /search/savedpins', () => {
  it('should return savedpins doc', (done) => {
    request(app)
      .get('/search/savedpins/')
      .set('x-access-token', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.savedPins[0].lat).to.equal(pins[0].lat);
        expect(res.body.savedPins[0].lng).to.equal(pins[0].lng);
        expect(res.body.savedPins.length).to.equal(1);
      })
      .end(done);
  });
});

describe('GET /search/savedpins/:id', () => {
  it('should return savedpins doc', (done) => {
    request(app)
      .get(`/search/savedpins/${pins[0]._id.toHexString()}`)
      .set('x-access-token', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin.lat).to.equal(pins[0].lat);
        expect(res.body.pin.lng).to.equal(pins[0].lng);
      })
      .end(done);
  });

  it('should return 404 if savedpins not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/search/savedpins/${hexId}`)
      .set('x-access-token', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/search/savedpins/123abc')
      .set('x-access-token', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /search/savedpins', () => {
  it('should remove all searchpins', (done) => {
    request(app)
      .delete('/search/savedpins')
      .set('x-access-token', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.find().then((allPins) => {
          expect(allPins.length).to.equal(pins.length - 1);
          done();
        });
      });
  });
});

describe('DELETE /search/savedpins/:id', () => {
  it('should remove a single searchpins', (done) => {
    const hexId = pins[0]._id.toHexString();

    request(app)
      .delete(`/search/savedpins/${hexId}`)
      .set('x-access-token', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin._id).to.equal(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.findById(hexId).then((resPin) => {
          expect(resPin).to.equal(null);
          done();
        }).catch(e => done(e));
      });
  });

  it('should return 404 if pin not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/search/savedpins/${hexId}`)
      .set('x-access-token', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/search/savedpins/123abc')
      .set('x-access-token', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

