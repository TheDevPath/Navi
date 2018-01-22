const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    query: {type: String, required: true},
    save_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SearchHistory', schema);