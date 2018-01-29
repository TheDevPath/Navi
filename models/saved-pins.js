const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const savedPinsSchema = new Schema({
    lat: {type: Number, min: -90, max: 90, required: true},
    lng: {type: Number, min: -180, max: 180, required: true},
    place_id: {type: String, required: true},
    save_date: {type: Date, default: Date.now},
})

module.exports = mongoose.model('SavedPins', savedPinsSchema);