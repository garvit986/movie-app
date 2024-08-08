const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
