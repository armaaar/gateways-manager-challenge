const express = require('express');
const mongoose = require('mongoose');
const gatewaysRouter = require('./controllers/gateways/routes');

const app = express();
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://db/gateways-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Routes which should handle requests
app.use('/gateways', gatewaysRouter);

// start express server on port 4000
app.listen(4000, () => {
  console.log('server started on port 4000');
});

