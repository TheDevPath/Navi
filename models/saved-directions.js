import { Schema } from 'mongoose';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    origin: {type: Schema.Types.Mixed, required: true},
    destination: {type: Schema.Types.Mixed, required: true},
    geocoded_waypoints: {type: [Schema.Types.Mixed], required: true},
    routes: {type: [Schema.Types.Mixed], required: true},
    save_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SavedDirections', schema);