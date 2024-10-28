const mongoose = require('mongoose');

const rateCardSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    rate: { type: Number, required: true },
});

module.exports = mongoose.model('RateCard', rateCardSchema);
