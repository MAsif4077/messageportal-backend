const mongoose = require('mongoose');

const messageLogSchema = new mongoose.Schema({
    senderNumber: { type: String, required: true },
    receiverNumber: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Number, default: Date.now }, 
    characterCount: { type: Number, required: true },
    balanceDeducted: { type: Number, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
});

module.exports = mongoose.model('MessageLog', messageLogSchema);
