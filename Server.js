const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URL
const mongoDBUrl = 'YOUR_MONGO_DB_URL_HERE'; // MongoDB Connection URL
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Define Movie Schema
const movieSchema = new mongoose.Schema({
  url: String,
  createdAt: { type: Date, default: Date.now },
});

// Create Movie Model
const Movie = mongoose.model('Movie', movieSchema);

// API Endpoint to Add Movie
app.post('/add-movie', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const newMovie = new Movie({ url });
    await newMovie.save();
    return res.status(201).json({ success: true, message: 'Movie added successfully!' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add movie' });
  }
});

// API Endpoint to Get All Movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Start server on port 5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
