const mongoose = require('mongoose');

const gatePassSchema = new mongoose.Schema({
  applicantName: {type: String, required: true},
  nic: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['not_verified', 'verified', 'approved'], default: 'not_verified' }
}, { timestamps: true });

const GatePass = mongoose.model('GatePass', gatePassSchema);

module.exports = GatePass;
