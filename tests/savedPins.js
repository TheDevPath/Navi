// api routes tests
const request = require('supertest');

const app = require('../app');
const SavedPins = require('../models/saved-pins');

beforeEach((done) => {
  SavedPins.remove({}).then(() => done());
});

describe('Saved Pins Routes', () => {
  it('should create new saved pin', (done) => {
    const pin = new SavedPins({
      lat: 1,
      lng: 2,
      place_id: 'testing',
    });

    request(app)
      .post('/search/savedpins')
      .send(pin)
      .expect(200)
      .expect((res) => {
        expect(res.body.lat).to.equal(pin.lat);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        SavedPins.find().then((savedPins) => {
          expect(savedPins.length).to.equal(1);
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
          expect(savedPins.length).to.equal(0);
          done();
        }).catch(e => done(e));
      });
  });
});
