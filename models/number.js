const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    number: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Number', numberSchema);
