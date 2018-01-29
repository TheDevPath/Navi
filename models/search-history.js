const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const searchHistorySchema = new Schema({
    query: {type: String, required: true},
    save_date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);