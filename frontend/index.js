
const express = require('express');
const app = express();

app.use(express.static('build'));

app.use((req, res) => {
  res.sendFile('build/index.html');
});

// start express server on port 5000
app.listen(3000, () => {
  console.log('server started on port 3000');
});
