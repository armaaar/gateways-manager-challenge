const mongoose = require('mongoose');

const peripheralSchema = new mongoose.Schema({
  UID: {
    type: Number,
    required: true,
    index: {unique: true, sparse: true},
  },
  vendor: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  status: {
    type: Boolean,
  },
});

module.exports = {
  peripheralSchema,
  Peripheral: mongoose.model('Peripheral', peripheralSchema),
};
