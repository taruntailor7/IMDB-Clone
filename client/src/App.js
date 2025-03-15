import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import EditMovieForm from "./components/EditMovieForm";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
          <Link to="/movies/new" className="nav-link">
            Add Movie
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/signup" className="nav-link">
            Signup
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected routes */}
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/new"
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id/edit"
            element={
              <ProtectedRoute>
                <EditMovieForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
