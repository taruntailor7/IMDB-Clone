import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/slices/movieSlice";
import "./MovieList.css";
import { Link } from "react-router-dom";

function MovieList() {
  const dispatch = useDispatch();
  const { list: movies, status, error } = useSelector((state) => state.movies);

  // New state variables for sorting and filtering
  const [sortOption, setSortOption] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  // Compute unique genres from movies array
  const uniqueGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres || []))
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  // Copy movies array so we can filter/sort without mutating the original
  let moviesToDisplay = [...movies];

  // Apply filtering by genre
  if (genreFilter) {
    moviesToDisplay = moviesToDisplay.filter(
      (movie) => movie.genres && movie.genres.includes(genreFilter)
    );
  }

  // Apply sorting based on selected option
  if (sortOption === "ratingDesc") {
    moviesToDisplay.sort((a, b) => b.averageRating - a.averageRating);
  } else if (sortOption === "ratingAsc") {
    moviesToDisplay.sort((a, b) => a.averageRating - b.averageRating);
  } else if (sortOption === "yearDesc") {
    moviesToDisplay.sort((a, b) => b.startYear - a.startYear);
  } else if (sortOption === "yearAsc") {
    moviesToDisplay.sort((a, b) => a.startYear - b.startYear);
  }

  if (status === "loading")
    return <p className="movie-list-loading">Loading movies...</p>;
  if (status === "failed")
    return <p className="movie-list-error">Error: {error}</p>;

  return (
    <div className="movie-list-container">
      <h2>Top 250 Movies</h2>
      <div className="movie-list-controls">
        <div className="control-group">
          <label htmlFor="sortSelect">Sort By:</label>
          <select
            id="sortSelect"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="ratingDesc">Rating: High to Low</option>
            <option value="ratingAsc">Rating: Low to High</option>
            <option value="yearDesc">Year: New to Old</option>
            <option value="yearAsc">Year: Old to New</option>
          </select>
        </div>
        <div className="control-group">
          <label htmlFor="genreSelect">Filter by Genre:</label>
          <select
            id="genreSelect"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="movie-list">
        {moviesToDisplay.map((movie) => (
          <li key={movie.id} className="movie-item">
            {movie.primaryImage && (
              <img
                src={movie.primaryImage}
                alt={movie.primaryTitle}
                className="movie-image"
              />
            )}
            <div className="movie-info">
              <h3>
                {movie.primaryTitle} ({movie.startYear})
              </h3>
              <p className="movie-rating">Rating: {movie.averageRating}</p>
              <p className="movie-description">{movie.description}</p>
              {movie.genres && movie.genres.length > 0 && (
                <p className="movie-genres">
                  Genres: {movie.genres.join(", ")}
                </p>
              )}
              <a
                href={movie.url}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                View on IMDb
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
