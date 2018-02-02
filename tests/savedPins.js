// api routes tests
const request = require('supertest');
const { ObjectID } = require('mongodb');

const app = require('../app');
const SavedPins = require('../models/saved-pins');

const pin = new SavedPins({
  _id: new ObjectID(),
  lat: 1,
  lng: 2,
  place_id: 'testing',
});

beforeEach((done) => {
  SavedPins.remove({}).then(() =>
    SavedPins.insertMany(pin)).then(() =>
    done());
});

describe('POST /search/savedpins', () => {
  it('should create new saved pin', (done) => {
    request(app)
      .post('/search/savedpins')
      .send(pin)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin.lat).to.equal(pin.lat);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.find().then((savedPins) => {
          expect(savedPins.length).to.equal(2);
          expect(savedPins[0].lat).to.equal(pin.lat);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create savedPin with invalid body data', (done) => {
    request(app)
      .post('/search/savedpins')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.find().then((savedPins) => {
          expect(savedPins.length).to.equal(1);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /search/savedpins', () => {
  it('should return savedpins doc', (done) => {
    request(app)
      .get(`/search/savedpins/${pin._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin.lat).to.equal(pin.lat);
      })
      .end(done);
  });
});

describe('GET /search/savedpins/:id', () => {
  it('should return savedpins doc', (done) => {
    request(app)
      .get(`/search/savedpins/${pin._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.pin.lat).to.equal(pin.lat);
      })
      .end(done);
  });

  it('should return 404 if savedpins not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/search/savedpins/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/search/savedpins/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /search/savedpins/:id', () => {
  it('should remove a searchpins', (done) => {
    const hexId = pin._id.toHexString();

    request(app)
      .delete(`/search/savedpins/${hexId}`)
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

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

