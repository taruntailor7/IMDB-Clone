const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  dob: Date,
  bio: String
});

module.exports = mongoose.model('Producer', producerSchema);
