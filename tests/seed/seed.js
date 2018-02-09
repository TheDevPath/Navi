const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config');

const User = require('../../models/users');
const SavedPins = require('../../models/saved-pins');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  name: 'mallek',
  email: 'mallek@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ id: userOneId }, JWT_KEY).toString(),
  }],
}, {
  _id: userTwoId,
  name: 'user',
  email: 'user@example.com',
  password: 'userTwoPass',
}];

const pins = [{
  _id: new ObjectID(),
  lat: 1,
  lng: 2,
  place_id: 'testing pin1',
  user: userOneId,
}, {
  _id: new ObjectID(),
  lat: 20,
  lng: 30,
  place_id: 'testing again',
  user: userTwoId,
}];

const populatePins = (done) => {
  SavedPins.remove({}).then(() => SavedPins.insertMany(pins)).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  pins, populatePins, users, populateUsers,
};
