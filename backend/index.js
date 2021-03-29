const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://db/gateways-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

// start express server on port 4000
app.listen(4000, () => {
  console.log('server started on port 4000');
});

