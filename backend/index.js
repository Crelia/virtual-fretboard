// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Enable CORS so your React app can access this API.
app.use(cors());

// Import chord data from the JSON file.
const chordData = require('./chordData.json');
const keyData = require('./keyData.json');

// Define an endpoint to retrieve all chords.
app.get('/api/chords', (req, res) => {
  res.json(chordData);
});

// You can add additional endpoints here as needed.
// For example, endpoints for retrieving a single chord or updating chord data.
// Define an endpoint to retrieve all keys.
app.get('/api/keys', (req, res) => {
    res.json(keyData);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
