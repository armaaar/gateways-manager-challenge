const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gatewaysRouter = require('./controllers/gateways/routes');
const peripheralsRouter = require('./controllers/peripherals/routes');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb://db/gateways-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Routes which should handle requests
const apiRouter = new express.Router();

apiRouter.use(gatewaysRouter);
apiRouter.use(peripheralsRouter);

app.use('/api', apiRouter);

// Handle 404
app.use(function(req, res) {
  res.status(404).send();
});

// Handle 500
app.use(function(req, res) {
  res.status(500).send();
});


// start express server on port 4000
app.listen(4000, () => {
  console.log('server started on port 4000');
});

