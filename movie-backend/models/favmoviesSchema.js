const mongoose = require('mongoose');

// Define the favmovies Schema
const favmoviesSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  imdbID:{
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create and export the favmovies model
const Favmovies = mongoose.model('Favmovies', favmoviesSchema);

module.exports = Favmovies;
