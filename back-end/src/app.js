const express = require("express");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
const app = express();
const mapsApi = require("./api/MapsApi");
const userApi = require("./api/UserApi");
const securityApi = require("./api/SecurityApi");
const categoryApi = require("./api/CategoryApi");
const cors = require("cors");
const path = require('path');

require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

// api google
app.get('/api/places', async (req, res) => {
  const query = req.query.query || 'Bancos in Encarnacion, Paraguay';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
  console.log(apiKey);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Google Places API:', error.message);
    res.status(500).json({ error: 'Error fetching data from Google Places API' });
  }
});

// Database connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(8001, () => {
      console.log("Server is running on port 8001");
    });
  })
  .catch((error) => console.error('Database connection failed:', error));

// Routes
app.use("/api/maps/", mapsApi);
app.use("/api/user/", userApi);
app.use("/api/security/", securityApi);
app.use("/api/registro", securityApi.register);
app.use("/api/category/", categoryApi);

module.exports = app;
