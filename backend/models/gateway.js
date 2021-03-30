const mongoose = require('mongoose');
const {peripheralSchema} = require('./peripheral');

const gatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: [true, 'Serial Number is required'],
    unique: true,
  },
  readableName: {
    type: String,
  },
  ipv4: {
    type: String,
    required: [true, 'IPv4 is required'],
    match: [
      /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/,
      'IPv4 is invalid',
    ],
  },
  peripherals: {
    type: [peripheralSchema],
    default: [],
  },
});

module.exports = {
  gatewaySchema,
  Gateway: mongoose.model('Gateway', gatewaySchema),
};
