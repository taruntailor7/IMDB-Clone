const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearOfRelease: { type: Number, required: true },
  plot: String,
  poster: String,
  producer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producer'
  },
  actors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }]
});

module.exports = mongoose.model('Movie', movieSchema);
