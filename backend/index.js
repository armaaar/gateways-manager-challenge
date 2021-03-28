const express = require('express');
const app = express(); // create express app

app.get('/', (req, res) => {
  res.send('This is from express.js');
});

// start express server on port 4000
app.listen(4000, () => {
  console.log('server started on port 4000');
});

