import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/slices/movieSlice';
import './MovieList.css';

function MovieList() {
  const dispatch = useDispatch();
  const { list: movies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p className="movie-list-loading">Loading movies...</p>;
  if (status === 'failed') return <p className="movie-list-error">Error: {error}</p>;

  return (
    <div className="movie-list-container">
      <h2>Top 250 Movies</h2>
      <ul className="movie-list">
        {movies.map((movie) => (
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
                  Genres: {movie.genres.join(', ')}
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
