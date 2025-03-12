const Movie = require("../models/Movie");
const Producer = require("../models/Producer");
const Actor = require("../models/Actor");

// exports.getAllMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find()
//       .populate('producer', 'name')
//       .populate('actors', 'name');
//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const axios = require("axios");

exports.getAllMovies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://imdb236.p.rapidapi.com/imdb/top250-movies",
      {
        headers: {
          "x-rapidapi-key":
            process.env.REACT_APP_OMDB_RAPID_API_KEY,
          "x-rapidapi-host": "imdb236.p.rapidapi.com",
        },
      }
    );
    // Send the data received from RapidAPI to the frontend
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching movies from RapidAPI:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    // Create new producer if details provided
    let producerId = req.body.producerId;
    if (req.body.newProducer) {
      const newProd = new Producer(req.body.newProducer);
      await newProd.save();
      producerId = newProd._id;
    }
    // Create new actors if details provided
    let actorIds = req.body.actorIds || [];
    if (req.body.newActors && Array.isArray(req.body.newActors)) {
      for (const actorData of req.body.newActors) {
        const newActor = new Actor(actorData);
        await newActor.save();
        actorIds.push(newActor._id);
      }
    }
    const movie = new Movie({
      name: req.body.name,
      yearOfRelease: req.body.yearOfRelease,
      plot: req.body.plot,
      poster: req.body.poster,
      producer: producerId,
      actors: actorIds,
    });
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate("producer")
      .populate("actors");
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Movie not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
