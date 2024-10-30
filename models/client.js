const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 },
    rateCard: { type: mongoose.Schema.Types.ObjectId, ref: 'RateCard' },
    isBlocked: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', default: null },
    role: { type: String, enum: ['superAdmin', 'client', 'subClient'], default: 'client' },
    password: { type: String}
});

clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('Client', clientSchema);
