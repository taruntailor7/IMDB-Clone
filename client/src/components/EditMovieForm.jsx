import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie, fetchMovies } from '../store/slices/movieSlice';
import './EditMovieForm.css';

function EditMovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: movies, status } = useSelector((state) => state.movies);

  const [name, setName] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');
  const [plot, setPlot] = useState('');
  const [poster, setPoster] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const movie = movies.find(m => m._id === id);
    if (movie) {
      setName(movie.name || '');
      setYearOfRelease(movie.yearOfRelease || '');
      setPlot(movie.plot || '');
      setPoster(movie.poster || '');
    }
  }, [movies, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = { name, yearOfRelease, plot, poster };
    dispatch(updateMovie({ id, updates }))
      .unwrap()
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="edit-movie-container">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit} className="edit-movie-form">
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
          <textarea
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Poster URL:</label>
          <input
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Update Movie</button>
      </form>
    </div>
  );
}

export default EditMovieForm;
