import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/slices/movieSlice";
import axios from "axios";
import "./MovieForm.css";

function MovieForm() {
  const dispatch = useDispatch();

  // Basic fields
  const [name, setName] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");

  // Producer
  const [producerId, setProducerId] = useState("");
  const [newProducer, setNewProducer] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  // Actors
  const [actorIds, setActorIds] = useState([]);
  const [newActors, setNewActors] = useState([]);

  // IMDb/RapidAPI integration
  const [imdbTitle, setImdbTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      yearOfRelease,
      plot,
      poster,
      producerId,
      newProducer: newProducer.name ? newProducer : null,
      actorIds,
      newActors,
    };
    dispatch(addMovie(payload));
  };

  // Function to fetch movie data from RapidAPI
  const handleFetchIMDB = async () => {
    if (!imdbTitle) return;
    try {
      const response = await axios.get(
        "https://imdb236.p.rapidapi.com/imdb/search?type=movie&genre=Drama&genres=Drama&rows=25&sortOrder=ASC&sortField=id'",
        {
          params: {
            query: imdbTitle,
            type: "movie",
          },
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
            "x-rapidapi-host": "imdb236.p.rapidapi.com",
          },
        }
      );

      // Check if results exist and update form fields
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const movieData = response.data.results[0];
        setName(movieData.title || "");
        setYearOfRelease(movieData.year || "");
        setPlot(movieData.plot || ""); // Some APIs may not provide plot info in the search results
        setPoster(movieData.image || "");
      } else {
        alert("Movie not found on RapidAPI.");
      }
    } catch (err) {
      console.error("Error fetching movie:", err);
      alert("Error fetching movie from RapidAPI");
    }
  };

  return (
    <div className="movie-form-container">
      <h2>Add Movie</h2>

      <div className="imdb-search">
        <label>IMDb Title:</label>
        <div className="imdb-search-input">
          <input
            type="text"
            value={imdbTitle}
            onChange={(e) => setImdbTitle(e.target.value)}
          />
          <button type="button" onClick={handleFetchIMDB}>
            Fetch from IMDb
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label>Movie Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Year of Release:</label>
          <input
            type="number"
            value={yearOfRelease}
            onChange={(e) => setYearOfRelease(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Plot:</label>
          <textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Poster URL:</label>
          <input
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>

        {/* Producer Section */}
        <div className="producer-section">
          <h3>Producer</h3>
          <div className="form-group">
            <label>Existing Producer ID:</label>
            <input
              type="text"
              placeholder="e.g. 63f...abc"
              value={producerId}
              onChange={(e) => setProducerId(e.target.value)}
            />
          </div>
          <p>OR add new Producer details below:</p>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={newProducer.name}
              onChange={(e) =>
                setNewProducer({ ...newProducer, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Gender"
              value={newProducer.gender}
              onChange={(e) =>
                setNewProducer({ ...newProducer, gender: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              value={newProducer.dob}
              onChange={(e) =>
                setNewProducer({ ...newProducer, dob: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Bio"
              value={newProducer.bio}
              onChange={(e) =>
                setNewProducer({ ...newProducer, bio: e.target.value })
              }
            />
          </div>
        </div>

        {/* Actors Section */}
        <div className="actors-section">
          <h3>Actors</h3>
          <div className="form-group">
            <label>Existing Actor IDs (comma-separated):</label>
            <input
              type="text"
              placeholder="e.g. 63f...abc,63f...xyz"
              onChange={(e) => setActorIds(e.target.value.split(","))}
            />
          </div>
          <p>OR add new Actor(s):</p>
          <button
            type="button"
            onClick={() =>
              setNewActors([
                ...newActors,
                { name: "", gender: "", dob: "", bio: "" },
              ])
            }
            className="add-actor-btn"
          >
            + Add New Actor
          </button>
          {newActors.map((actor, idx) => (
            <div key={idx} className="actor-group">
              <input
                type="text"
                placeholder="Name"
                value={actor.name}
                onChange={(e) => {
                  const updated = [...newActors];
                  updated[idx].name = e.target.value;
                  setNewActors(updated);
                }}
              />
              <input
                type="text"
                placeholder="Gender"
                value={actor.gender}
                onChange={(e) => {
                  const updated = [...newActors];
                  updated[idx].gender = e.target.value;
                  setNewActors(updated);
                }}
              />
              <input
                type="date"
                value={actor.dob}
                onChange={(e) => {
                  const updated = [...newActors];
                  updated[idx].dob = e.target.value;
                  setNewActors(updated);
                }}
              />
              <textarea
                placeholder="Bio"
                value={actor.bio}
                onChange={(e) => {
                  const updated = [...newActors];
                  updated[idx].bio = e.target.value;
                  setNewActors(updated);
                }}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Save Movie
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
