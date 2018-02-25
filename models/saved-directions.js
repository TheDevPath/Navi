const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const savedDirectionsSchema = new Schema({
  origin: { type: Schema.Types.Mixed, required: true },
  destination: { type: Schema.Types.Mixed, required: true },
  waypoints: { type: [Schema.Types.Mixed], required: true }, // array of {lat, lng} waypoints
  // routes: { type: [Schema.Types.Mixed], required: true },
  directions: { type: [String], required: true}, // string/html turn directions for waypoints
  save_date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  label: { type: String }, // use provided label
});

module.exports = mongoose.model('SavedDirections', savedDirectionsSchema);
