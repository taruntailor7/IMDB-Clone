import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HomePage.css';

function HomePage() {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="home-container">
      <h1>IMDB Clone Home</h1>
      <p>Welcome to the IMDB-like website!</p>
      {token ? (
        <Link to="/movies" className="home-button">Go to Movies</Link>
      ) : (
        <Link to="/login" className="home-button">Login to Continue</Link>
      )}
    </div>
  );
}

export default HomePage;
