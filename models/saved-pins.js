const mongoose = require('mongoose');

const savedPinsSchema = new mongoose.Schema({
  lat: {
    type: Number, min: -90, max: 90, required: true,
  },
  lng: {
    type: Number, min: -180, max: 180, required: true,
  },
  place_id: { type: String, default: '' },
  save_date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('SavedPins', savedPinsSchema);
