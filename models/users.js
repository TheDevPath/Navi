const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('Users', usersSchema);
